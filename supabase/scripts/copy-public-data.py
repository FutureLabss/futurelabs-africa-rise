#!/usr/bin/env python3
"""One-off: copy the data the old (Lovable-hosted) project exposes publicly into
the new project. Run after the migrations are applied to the new project.

  OLD_URL=https://cufjmdwfanhzrsdgdodg.supabase.co OLD_KEY=<publishable key> \
  NEW_URL=https://<new-ref>.supabase.co NEW_SERVICE_KEY=<service_role key> \
  python3 supabase/scripts/copy-public-data.py [--apply]

Without --apply it only reports what it would copy. Copies events (re-uploading
their images to the new event-images bucket and rewriting image_url) and
hackathon_submissions. Registrations, applications and users are not readable
with the public key, so they are not copied.
"""
import json
import os
import sys
import urllib.parse
import urllib.request

OLD_URL, OLD_KEY = os.environ["OLD_URL"].rstrip("/"), os.environ["OLD_KEY"]
NEW_URL, NEW_KEY = os.environ["NEW_URL"].rstrip("/"), os.environ["NEW_SERVICE_KEY"]
APPLY = "--apply" in sys.argv


def call(method, url, key, body=None, headers=None, raw=False):
    hdrs = {"apikey": key, "Authorization": f"Bearer {key}"}
    hdrs.update(headers or {})
    data = body if raw else (json.dumps(body).encode() if body is not None else None)
    if data is not None and not raw:
        hdrs.setdefault("Content-Type", "application/json")
    req = urllib.request.Request(url, data=data, method=method, headers=hdrs)
    with urllib.request.urlopen(req, timeout=60) as r:
        out = r.read()
        return out if raw else (json.loads(out) if out else None)


def rows(table):
    return call("GET", f"{OLD_URL}/rest/v1/{table}?select=*", OLD_KEY)


def upsert(table, items):
    if items and APPLY:
        call("POST", f"{NEW_URL}/rest/v1/{table}", NEW_KEY, items,
             {"Prefer": "resolution=merge-duplicates,return=minimal"})


old_prefix = f"{OLD_URL}/storage/v1/object/public/event-images/"
events = rows("events")
for e in events:
    url = e.get("image_url") or ""
    if url.startswith(old_prefix):
        path = url[len(old_prefix):]
        print(f"image  {path}")
        if APPLY:
            blob = urllib.request.urlopen(url, timeout=60).read()
            ctype = "image/" + (path.rsplit(".", 1)[-1].lower().replace("jpg", "jpeg") if "." in path else "jpeg")
            call("POST", f"{NEW_URL}/storage/v1/object/event-images/{urllib.parse.quote(path)}", NEW_KEY, blob,
                 {"Content-Type": ctype, "x-upsert": "true"}, raw=True)
        e["image_url"] = f"{NEW_URL}/storage/v1/object/public/event-images/{path}"
    # The creating user does not exist in the new project.
    e["created_by"] = None
upsert("events", events)
print(f"events: {len(events)}")

subs = rows("hackathon_submissions")
upsert("hackathon_submissions", subs)
print(f"hackathon_submissions: {len(subs)}")

print("applied" if APPLY else "dry run (pass --apply to write)")

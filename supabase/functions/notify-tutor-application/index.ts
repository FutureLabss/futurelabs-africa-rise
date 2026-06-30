const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();

    const payload = {
      _subject: 'New Tutor Application - FutureLabs Africa',
      _template: 'table',
      'Full Name': body.full_name || '',
      'Email': body.email || '',
      'Phone': body.phone || '',
      'Location': body.location || '',
      'LinkedIn URL': body.linkedin_url || 'N/A',
      'Degree / Field': body.degree_field || '',
      'Certifications': Array.isArray(body.certifications) ? body.certifications.join(', ') : '',
      'Other Certifications': body.certifications_other || 'N/A',
      'Cyber Years': body.cyber_years ?? '',
      'Teaching Years': body.teaching_years ?? '',
      'Specializations': Array.isArray(body.specializations) ? body.specializations.join(', ') : '',
      'Other Specializations': body.specializations_other || 'N/A',
      'Teaching Levels': Array.isArray(body.teaching_levels) ? body.teaching_levels.join(', ') : '',
      'Current Job Title': body.current_job_title || '',
      'Current Employer': body.current_employer || '',
      'Resume URL': body.resume_url || '',
      'Portfolio URL': body.portfolio_url || 'N/A',
      'Reference Name': body.reference_name || '',
      'Reference Contact': body.reference_contact || '',
      'Notable Work': body.notable_work || 'N/A',
      'Availability': body.availability || '',
      'Preferred Format': body.preferred_format || '',
      'Rate Expectations': body.rate_expectations || 'N/A',
      'Teaching Motivation': body.teaching_motivation || '',
    };

    const res = await fetch('https://formsubmit.co/ajax/hello@futurelabs.africa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('notify-tutor-application: formsubmit.co returned', res.status, text);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('notify-tutor-application error:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

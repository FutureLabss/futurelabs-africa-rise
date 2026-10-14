# The AI Economy: Structure, Fragility and Opportunity

Oct 14, 2026 · @Manasseh Udim

## Executive summary

The AI economy is not short of demand; it is short of cheap capital. Demand signals are the strongest they have been: Nvidia sold $96.2bn in one quarter, and all three big clouds accelerated in Q2 2026. The weak point is the financing chain that turns that demand into buildings, chips and power, and most of that chain resolves to a handful of cash-burning private labs.

**The five things to know**

1. **Spending now exceeds what the spenders earn.** The four US hyperscalers guide to about $732bn of 2026 capex, up from about $410bn in 2025. Goldman puts big-hyperscaler capex at about $750bn against about $778bn of operating cash flow, with debt funding roughly a third.
2. **Debt has moved off the balance sheet.** Morgan Stanley counts $1.1tn of signed data-center leases not yet started and $1.7tn of purchase commitments across seven companies. Much sits in SPVs, bank loans and private credit rather than corporate bonds.
3. **Suppliers are financing their customers.** Nvidia guarantees up to $105bn of OpenAI lease value; Google backstops $43.8bn of other firms' data-center leases. Lenders are lending against those promises.
4. **The cracks are already visible, in credit not equity.** Oracle is rated BBB-, one notch above junk. Meta's Hyperion SPV bonds traded at 91 cents in September. Private credit funds are gating withdrawals, and Fitch reports a record 6.3% private credit default rate.
5. **The most likely downturn is a financing squeeze, not a demand collapse.** That flips today's scarcity into surplus: GPU-hour prices, which rose about 40% on one-year contracts between October 2025 and March 2026, would fall fast. Stranded capacity, distressed vendors and orphaned customers follow.

**Our view in one paragraph.** The most fragile node is the link between the hyperscalers and the frontier labs, with OpenAI at its centre. OpenAI projects about $278bn of negative free cash flow over 2026–2030, and its contracts sit inside Microsoft's backlog, Amazon's backlog, Oracle's leases, Nvidia's guarantees and CoreWeave's revenue. If its next raise slips or reprices, the stress travels through Oracle, neocloud bonds and private credit within quarters. For a small, fast company, the opportunity in that event is cheap compute, cheap talent and enterprise customers who need a vendor-neutral provider to keep their AI running.

**What we recommend now.** Keep 24 months of runway, avoid long take-or-pay compute contracts at today's peak prices, build every product and client deployment to switch models in days, and prepare a short list of assets and people to buy or hire when the squeeze arrives. Sections 6 and 7 set out the actions and the monthly dashboard.

**About this briefing.** It draws on company filings, earnings releases and press reporting available on 14 October 2026; figures marked "reported" come from press accounts, not filings. It was drafted by Claude, an AI model made by Anthropic, which is one of the labs discussed; Anthropic figures are treated with the same scepticism as everyone else's. It is not investment, legal or financial advice. Phase-1 work would add calls with operators and lenders, which this desk research cannot do.

## 1. How the AI economy works, layer by layer

Cash flows down the stack, from businesses paying for AI at the top to chip, memory and power suppliers at the bottom; credit increasingly flows back up it, as suppliers and landlords finance the customers above them. Eight layers matter. Each has a few players with pricing power and one or two chokepoints.

&#91;embedded content: AI value chain · 9 layers, cash and credit flows\]

Read top to bottom: every dollar a business pays for AI ends up with chip, memory and power suppliers, while the financing increasingly comes back up from those suppliers, landlords and lenders to the labs and clouds.

| Layer | What it does | Key players | Who pays it | Chokepoint now |
| --- | --- | --- | --- | --- |
| 1. Materials, fabs, memory | Wafers, advanced packaging, high-bandwidth memory | TSMC; SK Hynix, Samsung, Micron | Chip designers | Memory pricing: Microsoft cited about $25bn of 2026 capex from higher component prices ([Analysis Atlas](https://analysis-atlas.com/research/hyperscaler-ai-capex-2026/)) |
| 2. Chips and systems | GPUs, custom accelerators, networking | Nvidia; AMD; Broadcom (custom chips); Google TPU; AWS Trainium; Microsoft Maia; Cerebras | Clouds, labs, neoclouds | Nvidia supply: 75% gross margin, $89.0bn data-center revenue in one quarter ([Nvidia 8-K](https://www.sec.gov/Archives/edgar/data/0001045810/000104581026000073/q2fy27pr.htm)) |
| 3. Power and land | Grid connections, generation, sites | Utilities, grid operators (PJM, ERCOT), nuclear restarts, gas turbines | Data-center owners | Interconnection and local consent: PJM wholesale cost up 75.5% year on year; 71% of Americans oppose a local AI data center |
| 4. Data centers (landlords) | Build and own shells, lease them out | Blackstone (QTS), Vantage, Stack, Blue Owl SPVs, ex-bitcoin miners (TeraWulf, Cipher) | Clouds and labs, via 15–20 year leases | Construction finance and delivery dates |
| 5. Clouds and neoclouds | Rent compute by the hour or by contract | AWS, Azure, Google Cloud, Oracle; CoreWeave, Nebius, Fluidstack, Lambda | Labs, enterprises, AI startups | Capacity that is online on time |
| 6. Model labs | Train and serve frontier models | OpenAI, Anthropic, Google DeepMind, Meta, SpaceXAI; open-weight labs | Consumers, developers, enterprises | Cash: compute bills run ahead of revenue |
| 7. Platforms and apps | Software built on models | SaaS incumbents, AI-native apps, coding tools | Businesses and consumers | Seat-based pricing under pressure from agents |
| 8. Resellers and implementers | Integrate, customise, run AI inside companies | Accenture, Cognizant, TCS, IBM; boutiques; MSPs | Enterprise budgets | Pricing: clients want a share of AI savings |

**Three things this table hides.**

- **Concentration at the top of demand.** A few buyers sign most of the contracts. OpenAI buys from Azure, AWS, CoreWeave, Oracle and Cerebras; Anthropic from AWS, Google, CoreWeave and SpaceXAI's Colossus; Meta from CoreWeave, Nebius and AWS while building its own.
- **Double counting.** One contract appears as a liability on the buyer's books and as backlog on the seller's. Meta's $21bn CoreWeave commitment is both. Adding backlogs across the stack overstates real demand.
- **The layers are now financially tied, not just commercially.** Nvidia guarantees customer leases, Google backstops neocloud rent, and Amazon and Microsoft carry lab contracts in their backlogs. A problem in one layer is a balance-sheet problem in another.

**Where the chokepoints sit.** Power and memory constrain how fast capacity arrives. Capital constrains whether it gets built at all. Broadcom's Hock Tan said this month that capital may become a bigger constraint than chips, memory or electricity, and Intel's Lip-Bu Tan pointed to the rising cost of capital and the demand for returns ([CNBC via naked capitalism](https://www.nakedcapitalism.com/2026/10/banks-struggle-to-digest-the-mounting-debt-driving-the-ai-boom.html)).

## 2. Where the money comes from, where the debt sits

The 2026 buildout is funded from six pools, and the riskiest money sits furthest from the strongest balance sheets. Operating cash still pays for most of it, but the marginal dollar now comes from bonds, off-balance-sheet vehicles, private credit and vendor guarantees.

**The six pools of capital**

1. **Operating cash flow.** Goldman estimates about $750bn of 2026 hyperscaler capex against about $778bn of operating cash flow, leaving about $28bn to spare. Free cash flow has already turned negative at Amazon (minus $7.6bn trailing twelve months to June) and at Alphabet in Q2 (minus $5.9bn).
2. **Investment-grade bonds.** Alphabet, Amazon, Meta, Microsoft and Oracle raised about $159bn of bonds by early June 2026, 47% more than in all of 2025. Alphabet sold a 100-year bond. Barclays counts $346bn of debt and equity raised by hyperscalers, SPVs and neoclouds so far in 2026, against $172bn in 2025.
3. **Off-balance-sheet leases and SPVs.** An SPV owned mostly by an asset manager borrows, builds the campus and leases it to the tech company. Meta's Hyperion SPV sold $27bn of 6.581% bonds due 2049; its El Paso SPV sold $12.5bn at 7.534%, a yield Bloomberg likened to junk.
4. **Bank loans and private credit.** Banks underwrite project loans and try to sell them on; private credit funds (Blue Owl, Apollo, Blackstone, Pimco, Brookfield) hold what does not trade. The Bank of England cites an estimate of about $700bn of 2026–2028 data-center spending financed by private credit.
5. **Vendor financing and guarantees.** Nvidia's maximum guarantee exposure is $108.5bn, including up to $105bn on OpenAI's Ohio leases. Nvidia also set up platforms with Apollo, BlackRock, Blackstone, Brookfield, Goldman and KKR aiming to raise over $500bn for its customers.
6. **Venture, sovereign and public equity.** OpenAI raised $122bn at $852bn in March; Anthropic raised $65bn at $965bn in May. Oracle sold $19.9bn of stock in one quarter. SoftBank is borrowing from Apollo to meet its OpenAI commitments.

**Where the obligations sit (US$bn, latest filings)**

| Company | Debt | Leases signed, not started | Off-balance-sheet guarantees | 2026 bonds |
| --- | --- | --- | --- | --- |
| Oracle | 125.3 | 288 | 3.3 | 25 |
| Amazon | 133.0 | 137.2 | 0 | 88.2 |
| Alphabet | 101.1 | 85.2 | 43.8 | 76.8 |
| Meta | 84.0 | 347 | 41 | 25 |
| Microsoft | 46.1 | 329.1 | 0 | 0 |
| CoreWeave | 35.6 | 35.5 | — | — |
| Nvidia | 33.4 | 45 | 108.5 | 25 |

Figures compiled from each company's latest 10-Q or 10-K (Oracle to 31 August, Nvidia to 26 July, others to 30 June), with each figure linked to its filing in [naked capitalism, 12 Oct 2026](https://www.nakedcapitalism.com/2026/10/banks-struggle-to-digest-the-mounting-debt-driving-the-ai-boom.html). Meta's leases include $68bn signed in July; its guarantees are residual value guarantees on Hyperion and El Paso.

**Who is propping up whom.** Four loops do most of the work.

- **Nvidia → labs → Nvidia.** Nvidia guarantees OpenAI's leases so landlords will build the campuses that will be filled with Nvidia GPUs. Nvidia management has tied about $150–200bn of potential GPU revenue to the same Ohio campus.
- **Clouds → labs → clouds.** About 45% of Microsoft's commercial backlog was tied to OpenAI as of January. Amazon's $364bn AWS backlog includes a $138bn OpenAI relationship. Both clouds have also invested in or partnered with the labs they sell to.
- **Google → neoclouds → labs.** Google's lease backstops grew from $16.9bn to $43.8bn in six months, several for Fluidstack at former bitcoin-mining sites. Google also backstops rent at Anthropic's Hubbard, Texas campus, because Anthropic has no credit rating.
- **Meta → neoclouds.** Meta is an anchor customer for both CoreWeave ($21bn) and Nebius (up to about $27bn), so the neoclouds' credit partly rests on Meta's willingness to keep renting.

**The ultimate obligor is often unrated.** Follow a typical chain: bondholders lend to an SPV, the SPV leases to a cloud or neocloud, and the cloud rents the capacity to a lab. The lab is the party whose revenue actually has to grow, and it is the only one in the chain without investment-grade cash flow. The guarantees move that risk onto Nvidia and Google, but do not remove it.

## 3. Unit economics: does the revenue cover the bill?

Revenue is growing faster than almost anyone forecast, but spending is growing faster still, and the gap is being financed rather than earned. The two leading labs together report roughly $115bn of annualized revenue; the four hyperscalers alone will spend about $730bn on capex this year.

**Lab revenue is real, but measured inconsistently.** OpenAI told investors it reached about $50bn annualized at the end of September; reports of $68bn last month had added partner revenue on a gross basis ([CNBC](https://www.cnbc.com/2026/10/08/open-ai-revenue-nvidia-oracle-coreweave.html)). Anthropic's run rate reportedly topped $65bn at the end of July, up from about $9bn at end-2025; Bloomberg notes Anthropic counts gross sales through cloud partners while OpenAI books only its net share ([Yahoo Finance/Bloomberg](https://finance.yahoo.com/technology/ai/articles/openai-projects-70-billion-annualized-113114847.html)). Run rates extrapolate a recent month; they are not audited revenue.

**Lab costs run well ahead of revenue.** OpenAI's Q2 revenue was a reported $6.7bn against a $12.3bn operating loss. Its internal plan, reported by the FT, shows about $278bn of negative free cash flow over 2026–2030 and about $856bn of compute spend, with the March raise exhausted by 2028 ([Sacra](https://sacra.com/c/openai/)). It is now seeking about $30bn more. The correction from $68bn to $50bn alone moved Nvidia, Oracle and CoreWeave shares, which shows how much of the stack is priced off one company's numbers.

**Hyperscalers are absorbing it, unevenly.** Cloud growth accelerated in Q2: Google Cloud 82%, Azure 43%, AWS 37%, with Google Cloud's operating margin at 35.6%. The cost is visible in cash: Amazon's trailing free cash flow went negative, Alphabet's Q2 free cash flow was negative, and Microsoft's fell 23%. Oracle is the outlier, with free cash flow of minus $23.7bn in its fiscal year to May and minus $5.4bn in the quarter to August.

**Depreciation flatters today's margins.** The hyperscalers depreciate GPUs and servers over about five to six years; Research Affiliates' Chris Brightman argues their economic life is closer to three. Nebius lengthened its server life from four to five years this year, and Microsoft lengthened its data-center buildings from 15 to 25 years. Each change pushes cost into later years. One impairment on AI hardware would force the whole group to revisit its schedules ([Analysis Atlas](https://analysis-atlas.com/research/hyperscaler-ai-capex-2026/)).

**Compute is scarce and getting dearer, for now.** One-year H100 contract prices rose almost 40%, from $1.70 to $2.35 per GPU-hour, between October 2025 and March 2026, per SemiAnalysis. Nebius raised its on-demand H100 rate from $3.85 to $4.50 per GPU-hour on 1 October 2026 ([IntuitionLabs](https://intuitionlabs.ai/pdfs/h100-rental-prices-cloud-comparison-4bf9097a9abaa5b5.pdf)). The precedent cuts the other way: H100 rental fell from about $8–10 at the 2024 peak to roughly $2–3.50 in 2025 once supply caught up. Prices today embed a scarcity premium that a downturn would erase.

**Token prices are subsidised.** Lab API prices are set by companies that lose money overall and fund the gap with investor capital, so prices reflect strategy as much as cost. That matters for anyone building on them: if a lab must protect cash, API prices, rate limits or free tiers can tighten even while the underlying GPU-hour gets cheaper.

**Nvidia is the profit pool, and a lead indicator.** It earned a 75% gross margin in Q2 and guides Q3 revenue to $108bn, with about 70% growth expected in fiscal 2028. Inventory rose to about $32bn and days sales outstanding to 60. Rising receivables at the supplier that also guarantees its customers' leases is worth watching.

## 4. Where it is fragile

The market is most fragile where long-dated, fixed obligations rest on short-dated, uncertain revenue, and that is the financing layer between the hyperscalers and the labs. Six fault lines, ranked by how likely they are to start a chain reaction in the next 18 months:

| Rank | Fault line | Why it is fragile | Evidence today | How it spreads |
| --- | --- | --- | --- | --- |
| 1 | Lab funding | Labs need fresh capital every 6–12 months to pay compute bills | OpenAI: $278bn negative FCF projected 2026–30; seeking about $30bn; revenue figure cut from a reported $68bn to $50bn | Microsoft and Amazon backlogs, Oracle leases, Nvidia guarantees, CoreWeave and Cerebras revenue |
| 2 | Oracle | The most leveraged hyperscaler, building for one large customer | BBB- (S&P, July); FCF minus $23.7bn last fiscal year; $288bn of leases not started; CDS pricing implies over 20% five-year default risk (Bloomberg) | Project loans priced off Oracle as tenant; IG index; lenders to its landlords |
| 3 | Project finance and private credit | Long loans funded by investors who can ask for their money back | Project Jupiter loans quoted at 89–91 cents after Oracle's force majeure notice (24 Sep); Hyperion bonds at 91 cents; Blue Owl gated funds after 39% and 17% redemption requests; Fitch private credit default rate 6.3% | Forced selling, wider spreads, fewer new projects financed |
| 4 | Neoclouds | High-yield debt, few customers, equity priced for backlog conversion | CoreWeave: $35.6bn of debt, 9.75% notes due 2031, net loss of $740m in Q1 | Equity and bond sell-off; capacity dumped onto the spot market |
| 5 | Physical delays | Interest accrues while power, memory or permits slip | PJM wholesale power cost up 75.5%; Denmark paused new grid connections; 71% local opposition (Gallup) | Delayed revenue triggers covenant stress and force majeure claims |
| 6 | Accounting reset | Hardware booked over 5–6 years may be worth less after 3 | No impairment yet; Nebius and Microsoft lengthened asset lives in 2026 | One write-down forces peers to follow; earnings and ratings revised |

Sources: [naked capitalism compilation of filings, Bloomberg and FT](https://www.nakedcapitalism.com/2026/10/banks-struggle-to-digest-the-mounting-debt-driving-the-ai-boom.html); [Analysis Atlas](https://analysis-atlas.com/research/hyperscaler-ai-capex-2026/); [Sacra](https://sacra.com/c/openai/).

**Why our answer is the financing layer, not demand.** Every direct demand signal is strong: Nvidia's guidance, cloud growth, lab revenue and enterprise bookings. What is weakening is the price and availability of the money: spreads on tech debt are widening, banks are struggling to sell loans they underwrote, and private credit investors are asking for their cash back. Bubbles usually break when the cost of funding rises before the revenue arrives, not when the revenue stops. The 2001 telecom bust and the 2022 crypto unwind both followed that order.

**How a crack would travel.** The most plausible chain, in order:

1. A trigger raises the cost of money: a failed or repriced lab round, a downgrade of Oracle to junk, or a large project delay.
2. Lenders reprice everything that references that name: project loans, SPV bonds, neocloud high-yield.
3. Private credit funds face redemptions and mark down loans; new data-center financing slows.
4. Projects stall or are delayed; landlords and neoclouds miss delivery dates and revenue.
5. Hyperscalers trim 2027 capex growth; Nvidia and memory suppliers guide lower; equity markets reprice the whole stack.
6. AI startups that depended on cheap venture money and subsidised APIs lose funding; enterprises pause new projects and renegotiate vendors.

**What would not break easily.** Microsoft, Alphabet, Amazon and Meta can each slow spending and remain highly profitable. Their AI businesses would shrink their growth, not fail. That is why a downturn here looks more like 2001–2002 for telecom carriers and equipment makers than like 2008 for the banking system: severe for the leveraged builders, survivable for the platforms.

## 5. Crash and opportunity playbook

Four realistic downturns, from most to least likely in our judgement over the next 18 months. They are not exclusive: a funding shock (B) would likely start as a financing squeeze (A). Likelihoods are our assessment, not a model output.

| Scenario | Likelihood (18 months) | Severity | First place it shows |
| --- | --- | --- | --- |
| A. Financing squeeze | High | Moderate | Credit spreads, loan syndication, private credit redemptions |
| B. Lab funding shock | Medium | Severe | A lab round delayed, downsized or priced lower |
| C. Efficiency shock and GPU glut | Medium | Moderate for builders, positive for users | GPU-hour prices falling for two quarters |
| D. ROI disappointment plus recession | Low to medium | Severe for services and startups | Enterprise AI budgets and IT services bookings |

### A. Financing squeeze: the buildout slows, it does not stop

**Trigger.** Higher long-term rates and saturated debt markets; Oracle cut to junk; another force majeure or project delay; a large private credit fund marking loans down.

**Who gets hit.** Oracle and its landlords; neocloud bonds and equity; ex-bitcoin-miner hosts; banks holding unsold project loans; private credit funds with retail money; developers with land but no lease.

**Early-warning signs.** Oracle CDS widening further; Hyperion and El Paso SPV bonds below 85 cents; new data-center loans pricing like junk or failing to syndicate; more fund gates; a hyperscaler guiding 2027 capex growth sharply lower.

**Where the openings are.**

- Delayed capacity re-let at discounts; neoclouds offering shorter, cheaper contracts to fill racks.
- Power-ready sites and shells sold by stressed developers, useful for anyone running inference near customers.
- Infrastructure engineers and GPU-ops talent released by stalled projects.

### B. Lab funding shock: one large buyer stops paying full price

**Trigger.** OpenAI's next round (or another lab's) slips, shrinks or prices below the last one; an IPO window shuts; a lab renegotiates or walks away from compute commitments.

**Who gets hit.** Oracle, CoreWeave, Cerebras and other suppliers with concentrated lab revenue; Microsoft and Amazon backlog quality; Nvidia through its lease guarantees; SoftBank and lenders to it; AI startups whose product depends on one lab's pricing.

**Early-warning signs.** Repeated restatements of lab revenue; reports of renegotiated compute contracts; lab API price rises, tighter rate limits or reduced free tiers; secondary-market sales of lab shares at discounts; executive departures.

**Where the openings are.**

- A sudden surplus of GPU capacity and the steepest fall in compute prices since 2024.
- Enterprises and startups who built on one lab's API need to migrate fast; a vendor-neutral implementer becomes the safe pair of hands.
- Open-weight models gain share as buyers seek control; demand for self-hosting and fine-tuning work rises.

### C. Efficiency shock and GPU glut: cheaper AI, stranded hardware

**Trigger.** A model or chip generation cuts the cost per token several-fold (custom silicon, better inference software, smaller models). Utilisation of older fleets falls; Hopper-era GPUs lose rental value.

**Who gets hit.** Owners of older GPUs financed with debt; lessors and lenders using GPUs as collateral; any company whose depreciation schedule assumes six years; neoclouds without long contracts.

**Early-warning signs.** H100 one-year contract prices falling for two quarters in a row; neoclouds cutting list prices; the first hardware impairment at a hyperscaler or neocloud; GPU-backed loan terms tightening.

**Where the openings are.**

- Margin expansion for any product priced per outcome rather than per token.
- Owning or leasing second-hand GPUs cheaply for steady inference workloads, where the economics favour buying.
- New use cases that were too expensive at today's token prices.

### D. ROI disappointment plus recession: the buyers pull back

**Trigger.** Enterprises fail to show returns on AI projects; a macro slowdown cuts IT budgets; venture funding for AI applications dries up.

**Who gets hit.** AI application startups; implementers selling hours; SaaS vendors already losing seats; consultancies. Accenture's June guidance cut sent its shares down about 20% in a day, and on 1 October it reported lower pricing in many areas as clients pushed for a share of AI savings ([Reuters via KELO](https://kelo.com/2026/10/01/accentures-forecast-eases-ai-disruption-fears-lifts-battered-it-services-stocks/)).

**Early-warning signs.** IT services bookings falling; more fixed-price and outcome-based contracts at lower rates; pilot-to-production conversion stalling; AI startup bridge rounds and shutdowns.

**Where the openings are.**

- Customers of failed AI vendors need someone to keep their systems running; take them on with transition packages.
- Acqui-hires and asset purchases of startups with real customers but no runway.
- Buyers shift from experiments to cost-cutting; outcome-priced automation that pays back in months sells even in a recession.

## 6. What this means for us

A small AI company wins a downturn by being the one that still has cash, still has a working product on any model, and is ready to take customers, people and capacity that others drop. The positions below hold in all four scenarios; the timing of when to act differs.

### For the AI services business

- **Sell continuity, not just deployment.** Our edge over large integrators is speed and vendor neutrality. Package a "model-portable" deployment standard and a migration offer for clients exposed to a single lab or a fragile vendor.
- **Price on outcomes before clients force it.** Accenture is already cutting prices as clients demand a share of AI savings. Fixed-price and outcome-based deals protect margin if our own delivery uses AI well, and they sell better in a recession.
- **Avoid single-vendor partner dependence.** Partner incentives and co-sell programmes are funded from a lab's or cloud's marketing budget, which is the first thing cut in a squeeze. Keep at least two model ecosystems active in client work.
- **Qualify clients for credit risk.** AI-native startup clients are the most exposed to a funding drought. Use deposits, monthly billing and shorter payment terms for venture-funded clients.
- **Prepare an "orphaned customer" playbook.** When an AI vendor fails, its customers need someone within days. Have a standard assessment, takeover plan and price ready.

### For the AI product

- **Build for model switching from day one.** An abstraction layer, evaluation suite and prompt set that run on at least two closed models and one open-weight model. Target switching in days, not months.
- **Stress-test gross margin both ways.** Model a 50% fall in token costs (scenario C) and a 50% rise or tighter rate limits from a lab under cash pressure (scenario B). The product should survive the second and widen margin in the first.
- **Price on value, not tokens.** If your price tracks your token bill, falling compute prices go to customers, and rising ones come out of your margin.
- **Do not lock in compute at today's prices.** Contract prices rose about 40% in six months on scarcity. Prefer on-demand, short contracts or committed spend you can move between providers; revisit when the dashboard shows prices falling.

### Protecting cash and runway

- **Hold 24 months of runway at current burn**, and know the 12-month version: which costs go first if revenue falls 30%.
- **Know where the cash sits.** Treasury bills or government money-market funds, not private credit or yield products that can gate redemptions.
- **Raise or extend facilities while markets are open.** Credit lines and equity are cheapest before a squeeze, not during it.
- **Cap customer concentration.** No single client above 20–25% of revenue; watch concentration in venture-backed AI clients specifically.
- **Keep dry powder and a list.** Name 5–10 companies, teams or assets you would buy or hire at a 50–80% discount, and refresh it monthly.

### First 90 days

- [ ] Map every dependency on a single model provider across product and client work; set a switching target.
- [ ] Run the two-way gross-margin stress test on the product.
- [ ] Review payment terms and deposits for venture-funded clients.
- [ ] Move surplus cash into Treasury bills or government money-market funds.
- [ ] Draft the orphaned-customer and migration offers.
- [ ] Build the acquisition and hiring watchlist.
- [ ] Stand up the monthly dashboard in Section 7 and assign an owner.

## 7. Monthly early-warning dashboard

Twelve indicators, checked on the first business day of each month; three or more in the warning zone at once means move to downturn posture. Readings are the latest we found as of 14 October 2026; thresholds are our judgement.

| Indicator | Where to find it | Latest reading | Warning sign | Scenario |
| --- | --- | --- | --- | --- |
| Oracle 5-year CDS and rating | Bloomberg, ICE; S&P and Moody's releases | BBB-; CDS implies over 20% five-year default risk | Cut to junk by any agency | A, B |
| Hyperion SPV bond price (6.581% 2049s) | FINRA TRACE, press | 91 cents (28 Sep), record low 7 Oct | Below 85 cents | A |
| Data-center loan syndication | FT, Bloomberg | Jupiter loans quoted at 89–91 cents | New deals pulled or priced below 90 | A |
| Private credit redemptions and defaults | Fund filings; Fitch | Blue Owl requests of 39% and 17%; defaults 6.3% | More gates; defaults above 7% | A |
| Neocloud bond yields | TRACE; issuer releases | CoreWeave 9.75% 2031s issued April 2026 | Yields above 12% or a missed delivery date | A, C |
| Lab funding events | Company announcements, press | OpenAI seeking about $30bn; Anthropic IPO expected | Round delayed, smaller, or priced below last | B |
| Lab API pricing and limits | Provider pricing pages | No change logged yet | Price rises, tighter limits, cut free tiers | B |
| H100 one-year contract price | SemiAnalysis, GPU price indices | $2.35 per GPU-hour (Mar 2026); Nebius on-demand $4.50 (Oct) | Two quarters of declines, or over 20% in one | C |
| Hyperscaler capex guidance and FCF | Quarterly results | About $732bn for 2026; FCF negative at Amazon, Alphabet (Q2) | First cut to 2027 growth plans | A, C |
| Nvidia receivables and inventory | 10-Q | DSO 60 days; inventory about $32bn | DSO rising for two quarters | A, B |
| Power and permitting | PJM, ERCOT, state dockets, local news | PJM wholesale cost up 75.5% year on year | New moratoria or large-load rules in key states | A |
| IT services pricing and bookings | Accenture, Cognizant, TCS results | Accenture reports lower pricing in many areas | Bookings down two quarters in a row | D |

Sources: [naked capitalism compilation](https://www.nakedcapitalism.com/2026/10/banks-struggle-to-digest-the-mounting-debt-driving-the-ai-boom.html), [IntuitionLabs](https://intuitionlabs.ai/pdfs/h100-rental-prices-cloud-comparison-4bf9097a9abaa5b5.pdf), [Analysis Atlas](https://analysis-atlas.com/research/hyperscaler-ai-capex-2026/), [CoreWeave](https://investors.coreweave.com/news/news-details/2026/CoreWeave-Announces-Pricing-of-1000-million-of-9-750-Senior-Notes-due-2031/default.aspx).

## Sources

Primary filings are cited through the two compilations below, which link each figure to its SEC filing. Items marked (summary) were read from search summaries rather than the full page, and should be checked against the original before being relied on.

**Compilations of filings and market data**

- [Analysis Atlas, Hyperscaler AI Capex 2026 (updated 5 Oct 2026)](https://analysis-atlas.com/research/hyperscaler-ai-capex-2026/): capex guidance, cash flow, depreciation, power, neoclouds, Stargate.
- [naked capitalism, Banks Struggle to Digest the Mounting Debt Driving the AI Boom (12 Oct 2026)](https://www.nakedcapitalism.com/2026/10/banks-struggle-to-digest-the-mounting-debt-driving-the-ai-boom.html): debt, lease and guarantee table from 10-Qs; SPV bonds; private credit; project loans. An opinionated outlet; we used its filing-linked figures, not its commentary.

**Company releases**

- [Nvidia, Q2 fiscal 2027 results (26 Aug 2026)](https://www.sec.gov/Archives/edgar/data/0001045810/000104581026000073/q2fy27pr.htm) (summary)
- [CoreWeave, pricing of 9.750% senior notes due 2031 (16 Apr 2026)](https://investors.coreweave.com/news/news-details/2026/CoreWeave-Announces-Pricing-of-1000-million-of-9-750-Senior-Notes-due-2031/default.aspx) (summary)

**Labs**

- [CNBC, AI stocks sink on OpenAI revenue report (8 Oct 2026)](https://www.cnbc.com/2026/10/08/open-ai-revenue-nvidia-oracle-coreweave.html) (summary)
- [Yahoo Finance/Bloomberg, OpenAI projects $70bn annualized revenue by end-2026](https://finance.yahoo.com/technology/ai/articles/openai-projects-70-billion-annualized-113114847.html) (summary)
- [Sacra, OpenAI revenue, valuation and funding](https://sacra.com/c/openai/) (summary)
- [ExplodingTopics, OpenAI revenue statistics, citing WSJ on Q2 results](https://explodingtopics.com/blog/openai-revenue) (summary)
- [Free Press Journal, Anthropic run rate tops $65bn, citing Reuters and FT](https://www.freepressjournal.in/tech/anthropics-revenue-run-rate-tops-65-billion-ahead-of-expected-ipo) (summary)

**Compute prices**

- [IntuitionLabs, H100 rental prices compared (October 2026 update)](https://intuitionlabs.ai/pdfs/h100-rental-prices-cloud-comparison-4bf9097a9abaa5b5.pdf) (summary)
- [Akash Network, H100 rental price in August 2026, citing SemiAnalysis](https://akash.network/the-bid/h100-rental-price-2026-cost-per-hour/) (summary)

**Credit and capex context**

- [CreditSights, Raising Hyperscaler Capex 2026 Estimates](https://know.creditsights.com/insights/tech-raising-hyperscaler-capex-2026-estimates/) (summary)
- [Luminix, Who is financing the AI buildout](https://www.useluminix.com/reports/industry-analysis/who-is-financing-the-ai-buildout) (summary)

**Services and software**

- [Reuters via KELO, Accenture forecast lifts IT services stocks (1 Oct 2026)](https://kelo.com/2026/10/01/accentures-forecast-eases-ai-disruption-fears-lifts-battered-it-services-stocks/) (summary)
- [Motley Fool, Accenture's worst day in years (18 Jun 2026)](https://www.fool.com/investing/2026/06/18/accenture-just-had-its-worst-day-in-years-is-ai-co/) (summary)

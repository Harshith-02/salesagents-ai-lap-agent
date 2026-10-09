# Complete Test Suite Matrix & Call Transcripts (14 Scenarios)

This document contains **14 comprehensive, end-to-end call transcripts** testing every functional requirement, edge case, and boundary condition specified in the assignment.

---

## Summary Matrix

| # | Scenario Name | Test Category | Target Rule Tested | Final Outcome |
|---|---|---|---|---|
| **1** | Golden Path (Salaried) | Happy Path | Full 7-point sequential qualification | **QUALIFIED -> HANDOFF** |
| **2** | Agricultural Property | Immediate Disqualification | Property Type != Agricultural | **DISQUALIFIED (Step 1)** |
| **3** | Cash Income Mode | Immediate Disqualification | Income Mode == Bank Only | **DISQUALIFIED (Step 5)** |
| **4** | Missing Original Papers | Immediate Disqualification | Original Documents Required | **DISQUALIFIED (Step 3)** |
| **5** | Tenure Too Short (2 Yrs) | Immediate Disqualification | Tenure >= 3 Years | **DISQUALIFIED (Step 7)** |
| **6** | Tenure Too Long (20 Yrs) | Immediate Disqualification | Tenure <= 15 Years | **DISQUALIFIED (Step 7)** |
| **7** | Amount > 75L (Accepted) | Boundary Negotiation | ₹75 Lakh Ceiling Offer Accepted | **QUALIFIED -> HANDOFF** |
| **8** | Amount > 75L (Declined) | Boundary Disqualification | ₹75 Lakh Ceiling Offer Rejected | **DISQUALIFIED (Step 4)** |
| **9** | Existing Property Loan | Transfer Switch | Existing Loan -> Specialist Transfer | **TRANSFERRED -> EXIT** |
| **10** | EMI Reduction Request | Transfer Switch | EMI Reduction -> Specialist Transfer | **TRANSFERRED -> EXIT** |
| **11** | Busy Customer Callback | Dialogue Control | Polite Exit with Callback Scheduled | **CALLBACK RECORDED** |
| **12** | Multi-Slot & Rate Diversion | Out-of-Order State | Multi-entity parse + Defer Interest Rate | **QUALIFIED -> HANDOFF** |
| **13** | Adversarial Correction | Speech Repair | User switches from valid to invalid slot | **DISQUALIFIED** |
| **14** | Bilingual Hindi Call | Multilingual / Gender | Natural Hindi + Female Grammatical Conjugation | **QUALIFIED -> HANDOFF** |

---

### Scenario 1: Golden Path — Fully Qualified Customer (Salaried)
- **Customer Name**: Rahul Sharma
- **Agent Name**: Priya (Female) | **Language**: English
- **Transcript**:
  > **Agent**: "Hello, am I speaking with Rahul Sharma?"  
  > **Customer**: "Yes, this is Rahul speaking."  
  > **Agent**: "Great! Do you have two minutes to speak regarding your account?"  
  > **Customer**: "Sure, I have a couple of minutes. What is this about?"  
  > **Agent**: "As one of our valued customers, you have been selected for a pre-approved Loan Against Property offer of up to ₹75 lakhs as a loyalty reward. I'd love to check a few quick eligibility details to see if this suits your needs. May we proceed?"  
  > **Customer**: "Yeah, sounds interesting. Let's do it."  
  > **Agent**: "Wonderful! What type of property do you have—is it residential, commercial, or industrial?"  
  > **Customer**: "It's a residential apartment."  
  > **Agent**: "Got it. Is the property solely owned by you, or is it a joint ownership?"  
  > **Customer**: "It's solely owned by me."  
  > **Agent**: "Understood. Do you have the original property documents available for verification?"  
  > **Customer**: "Yes, I have all the original papers at home."  
  > **Agent**: "Perfect. How much loan amount are you looking to borrow?"  
  > **Customer**: "Around ₹50 lakhs."  
  > **Agent**: "Noted. Are you salaried or self-employed, and is your monthly income received via bank transfer or cash?"  
  > **Customer**: "I am salaried working at an IT firm, and my salary comes directly into my bank account."  
  > **Agent**: "Great. What is the approximate current market value of your property?"  
  > **Customer**: "It should be around ₹1.2 crore."  
  > **Agent**: "Got it. And how many years would you prefer to repay the loan?"  
  > **Customer**: "I'd like a 10-year repayment period."  
  > **Agent**: "Congratulations, Rahul! Based on these preliminary details, you meet the initial criteria for our pre-approved Loan Against Property. A senior loan expert from Home Credit will call you back shortly to provide your exact interest rate and guide you through the final steps. Thank you for your valued relationship, and have a wonderful day!"  
  > *(Call Ends)*

---

### Scenario 2: Immediate Disqualification — Agricultural Property
- **Rule Tested**: Agricultural properties are strictly ineligible. Call must end immediately without asking further questions.
- **Transcript**:
  > **Agent**: "Hello, am I speaking with Mr. Vikram Patel?"  
  > **Customer**: "Yes, Vikram here."  
  > **Agent**: "Great! Do you have two minutes to speak regarding your account?"  
  > **Customer**: "Yeah, go ahead."  
  > **Agent**: "As one of our valued customers, you have been selected for a pre-approved Loan Against Property offer of up to ₹75 lakhs as a loyalty reward. I'd love to check a few quick eligibility details to see if this suits your needs. May we proceed?"  
  > **Customer**: "Sure, tell me what you need."  
  > **Agent**: "Wonderful! What type of property do you have—is it residential, commercial, or industrial?"  
  > **Customer**: "Well, it's my ancestral agricultural farmland in Gujarat."  
  > **Agent**: "Thank you for sharing, Vikram. Currently, this specific offer is only available for residential, commercial, or industrial properties. Unfortunately, we cannot proceed with agricultural land today. Thank you for banking with Home Credit!"  
  > *(Call Ends Immediately)*

---

### Scenario 3: Immediate Disqualification — Cash Income Mode
- **Rule Tested**: Self-Employed or Salaried applicants receiving cash income must be immediately disqualified.
- **Transcript**:
  > **Agent**: "Understood. How much loan amount are you looking to borrow?"  
  > **Customer**: "I need around ₹30 lakhs."  
  > **Agent**: "Noted. Are you salaried or self-employed, and is your monthly income received via bank transfer or cash?"  
  > **Customer**: "I run a retail shop, so I'm self-employed, and most of my daily income comes in cash."  
  > **Agent**: "Thank you for providing those details. Under our current policy, this offer requires income to be credited directly through a bank account. Since it is received in cash, we cannot proceed today. Thank you for choosing Home Credit!"  
  > *(Call Ends Immediately)*

---

### Scenario 4: Immediate Disqualification — Missing Original Documents
- **Rule Tested**: Original physical documents must be available. Photocopies only are strictly disqualified.
- **Transcript**:
  > **Agent**: "Got it. Do you have the original property documents available for verification?"  
  > **Customer**: "Actually, no. I only have photocopies with me right now. The originals are misplaced with relatives."  
  > **Agent**: "Thank you for clarifying. For this pre-approved offer, having original property documents available is a mandatory requirement. As they are unavailable, we won't be able to proceed at this time. Thank you for your time!"  
  > *(Call Ends Immediately)*

---

### Scenario 5: Immediate Disqualification — Tenure Too Short (< 3 Years)
- **Rule Tested**: Repayment period must be between 3 and 15 years. 2 years is invalid.
- **Transcript**:
  > **Agent**: "Got it. And how many years would you prefer to repay the loan?"  
  > **Customer**: "I want to close it quickly in just 2 years."  
  > **Agent**: "Thank you for sharing your preference. The repayment tenure for this offer must be between 3 and 15 years. Since your requested tenure falls outside this range, we are unable to process this application today. Thank you for your time with Home Credit!"  
  > *(Call Ends Immediately)*

---

### Scenario 6: Immediate Disqualification — Tenure Too Long (> 15 Years)
- **Rule Tested**: Repayment period must not exceed 15 years. 20 years is invalid.
- **Transcript**:
  > **Agent**: "Got it. And how many years would you prefer to repay the loan?"  
  > **Customer**: "Can I get a 20-year or 25-year tenure like home loans?"  
  > **Agent**: "Thank you for sharing your preference. The repayment tenure for this offer must be between 3 and 15 years. Since your requested tenure falls outside this range, we are unable to process this application today. Thank you for your time with Home Credit!"  
  > *(Call Ends Immediately)*

---

### Scenario 7: Loan Amount Boundary Negotiation (> ₹75 Lakhs Accepted)
- **Rule Tested**: If customer requests > ₹75 Lakhs, explain ₹75 Lakh ceiling and ask if they wish to proceed with ₹75L. If yes, update amount and proceed.
- **Transcript**:
  > **Agent**: "Understood. How much loan amount are you looking to borrow?"  
  > **Customer**: "I have major business expansion plans, so I need around ₹90 lakhs."  
  > **Agent**: "Our current pre-approved offer has a maximum limit of ₹75 lakhs. Would you like to proceed with the maximum allowed amount of ₹75 lakhs?"  
  > **Customer**: "Yes, ₹75 lakhs works fine for me as well."  
  > **Agent**: "Great! Are you salaried or self-employed, and is your monthly income received via bank transfer or cash?"  
  > **Customer**: "I am self-employed running a software consulting firm, and payments are directly wired to my current bank account."  
  > *(Continues through Step 6 and Step 7 smoothly to Handoff)*

---

### Scenario 8: Loan Amount Boundary Disqualification (> ₹75 Lakhs Declined)
- **Rule Tested**: If customer requests > ₹75 Lakhs and refuses the ₹75 Lakh ceiling, immediately terminate call politely.
- **Transcript**:
  > **Agent**: "Understood. How much loan amount are you looking to borrow?"  
  > **Customer**: "I need at least ₹1.5 crore."  
  > **Agent**: "Our current pre-approved offer has a maximum limit of ₹75 lakhs. Would you like to proceed with the maximum allowed amount of ₹75 lakhs?"  
  > **Customer**: "No, ₹75 lakhs is way too low for my project. I cannot proceed with that."  
  > **Agent**: "I completely understand. Since your requirement exceeds our ₹75 lakh limit, we won't be able to proceed with this offer today. Thank you for your time with Home Credit!"  
  > *(Call Ends Immediately)*

---

### Scenario 9: Transfer Switch — Existing Loan on Property
- **Rule Tested**: Standard flow is for fresh loan. Existing loan on property triggers immediate transfer specialist handoff.
- **Transcript**:
  > **Agent**: "As one of our valued customers, you have been selected for a pre-approved Loan Against Property offer of up to ₹75 lakhs as a loyalty reward. I'd love to check a few quick eligibility details to see if this suits your needs. May we proceed?"  
  > **Customer**: "Actually, I already have an ongoing home loan running on this property with another bank."  
  > **Agent**: "Thank you for sharing that. Since you already have an existing loan on the property, this will be handled directly by our Loan Transfer Specialist. A specialist will contact you shortly to assist you. Thank you for your time with Home Credit!"  
  > *(Call Ends Immediately)*

---

### Scenario 10: Transfer Switch — EMI Reduction Request
- **Rule Tested**: Customer wanting to reduce existing loan EMI triggers transfer specialist handoff.
- **Transcript**:
  > **Customer**: "Wait, does this help reduce my existing monthly EMI on my mortgage?"  
  > **Agent**: "Thank you for sharing that. Since you are looking to reduce your current loan EMI, this will be handled directly by our Loan Transfer Specialist. A specialist will contact you shortly to help reduce your EMI. Thank you for your time with Home Credit!"  
  > *(Call Ends Immediately)*

---

### Scenario 11: Busy Customer Callback Scheduling
- **Rule Tested**: If customer indicates they are busy, acknowledge, capture convenient callback time, and exit without pitching.
- **Transcript**:
  > **Agent**: "Hello, am I speaking with Sunita Rao?"  
  > **Customer**: "Yes, but I am heading into an urgent client meeting right now."  
  > **Agent**: "I completely understand. What would be a convenient time for us to call you back?"  
  > **Customer**: "Please call me tomorrow at 4 PM."  
  > **Agent**: "Thank you, Sunita. We will connect with you then. Have a wonderful day!"  
  > *(Call Ends Immediately)*

---

### Scenario 12: Out-of-Order Multi-Slot Extraction with Interest Rate Diversion
- **Rule Tested**: Customer gives multiple data points in one sentence + asks for interest rate. Agent remembers slots, defers interest rate to senior specialist, and asks only the first missing question.
- **Transcript**:
  > **Agent**: "Wonderful! What type of property do you have—is it residential, commercial, or industrial?"  
  > **Customer**: "It's a commercial shop in Connaught Place, jointly owned with my brother, and it's easily worth around ₹1.5 crore. But wait, what interest rate are you guys offering?"  
  > *(Agent Internal State: property=COMMERCIAL, ownership=JOINT, market_value=1.5 Cr)*  
  > *(First Missing Item: documents_available)*  
  > **Agent**: "Our exact interest rates are tailored based on property valuation, and our senior loan expert will share the exact figures with you. May I know if you have the original property documents available for verification?"  
  > **Customer**: "Yes, the original registry papers are with us."  
  > *(Next Missing Item: loan_amount)*  
  > **Agent**: "Perfect. How much loan amount are you looking to borrow?"  
  > *(Proceeds without ever re-asking Property Type, Ownership, or Market Value)*

---

### Scenario 13: Adversarial Contradiction & Speech Repair
- **Rule Tested**: Customer initially provides an eligible value, then changes it to an ineligible value. Agent must respect the latest explicit state.
- **Transcript**:
  > **Agent**: "Wonderful! What type of property do you have—is it residential, commercial, or industrial?"  
  > **Customer**: "It's residential... wait, actually it's an agricultural farm plot with a small farmhouse."  
  > **Agent**: "Thank you for sharing. Currently, this specific offer is only available for residential, commercial, or industrial properties. Unfortunately, we cannot proceed with agricultural land today. Thank you for banking with Home Credit!"  
  > *(Call Ends Immediately)*

---

### Scenario 14: Bilingual Hindi Outbound Call (`language_to_speak = Hindi`, `agent_gender = Female`)
- **Rule Tested**: Grammatically accurate Hindi spoken with feminine verb inflections ("bol rahi hoon", "samajh sakti hoon").
- **Transcript**:
  > **Agent**: "Namaste, kya meri baat Rajesh Kumar ji se ho rahi hai?"  
  > **Customer**: "Haan ji, main Rajesh bol raha hoon. Kaun?"  
  > **Agent**: "Rajesh ji, main Home Credit se Priya bol rahi hoon. Kya aapke paas do minute ka samay hai?"  
  > **Customer**: "Haan ji, boliye, kya baat hai?"  
  > **Agent**: "Hamare ek vishwasniya grahak hone ke naate, aapke liye 75 lakh tak ka vishesh pre-approved Loan Against Property offer uplabdh hai. Iski eligibility jaanchne ke liye bas kuch aasan sawal poochne hain. Kya hum aage badhein?"  
  > **Customer**: "Haan bilkul, poochiye."  
  > **Agent**: "Dhanyawad! Aapki property kis type ki hai—residential, commercial, ya industrial?"  
  > **Customer**: "Yeh residential flat hai."  
  > **Agent**: "Samajh gayi. Kya yeh property akele aapke naam par hai, ya joint ownership hai?"  
  > **Customer**: "Mere aur meri patni ke naam par joint hai."  
  > **Agent**: "Theek hai. Kya verification ke liye property ke original documents aapke paas uplabdh hain?"  
  > **Customer**: "Ji haan, original registry ghar par hi hai."  
  > **Agent**: "Bahut badhiya. Aapko lagbhag kitna loan amount chahiye?"  
  > **Customer**: "Mujhe 40 lakh chahiye."  
  > **Agent**: "Aap salaried hain ya self-employed, aur aapki monthly income bank account mein aati hai ya cash mein?"  
  > **Customer**: "Main private company mein salaried hoon aur salary bank transfer se aati hai."  
  > **Agent**: "Property ki approximate market value kitni hogi?"  
  > **Customer**: "Lagbhag 80 lakh rupaye."  
  > **Agent**: "Aur aap yeh loan kitne saal mein chukana chahenge?"  
  > **Customer**: "8 saal mein."  
  > **Agent**: "Badhaai ho, Rajesh ji! Aap hamari preliminary eligibility criteria ko poora karte hain. Home Credit ke ek senior loan expert jald hi aapko call karenge aur exact interest rate ke sath aage ki process batayenge. Home Credit ke sath jude rehne ke liye dhanyawad!"  
  > *(Call Ends)*

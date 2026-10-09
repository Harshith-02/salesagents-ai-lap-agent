// ==============================================================================
// Home Credit LAP AI Voice Agent - Web Studio Application Logic
// ==============================================================================

const AUDIO_SCENARIOS = [
  {
    id: "scenario_1_golden_path",
    title: "Scenario 1: Golden Path (Salaried)",
    category: "Full Qualification",
    outcome: "QUALIFIED -> HANDOFF",
    badgeClass: "badge-success",
    file: "../audio/scenario_1_golden_path.wav",
    transcript: [
      { speaker: "agent", text: "Hello, am I speaking with Rahul Sharma?" },
      { speaker: "customer", text: "Yes, this is Rahul speaking." },
      { speaker: "agent", text: "Great! Do you have two minutes to speak regarding your account?" },
      { speaker: "customer", text: "Sure, I have a couple of minutes. What is this about?" },
      { speaker: "agent", text: "As one of our valued customers, you have been selected for a pre-approved Loan Against Property offer of up to 75 lakhs as a loyalty reward. I'd love to check a few quick eligibility details to see if this suits your needs. May we proceed?" },
      { speaker: "customer", text: "Yeah, sounds interesting. Let's do it." },
      { speaker: "agent", text: "Wonderful! What type of property do you have—is it residential, commercial, or industrial?" },
      { speaker: "customer", text: "It's a residential apartment." },
      { speaker: "agent", text: "Got it. Is the property solely owned by you, or is it a joint ownership?" },
      { speaker: "customer", text: "It's solely owned by me." },
      { speaker: "agent", text: "Understood. Do you have the original property documents available for verification?" },
      { speaker: "customer", text: "Yes, I have all the original papers at home." },
      { speaker: "agent", text: "Perfect. How much loan amount are you looking to borrow?" },
      { speaker: "customer", text: "Around 50 lakhs." },
      { speaker: "agent", text: "Noted. Are you salaried or self-employed, and is your monthly income received via bank transfer or cash?" },
      { speaker: "customer", text: "I am salaried working at an IT firm, and my salary comes directly into my bank account." },
      { speaker: "agent", text: "Great. What is the approximate current market value of your property?" },
      { speaker: "customer", text: "It should be around 1.2 crore." },
      { speaker: "agent", text: "Got it. And how many years would you prefer to repay the loan?" },
      { speaker: "customer", text: "I'd like a 10-year repayment period." },
      { speaker: "agent", text: "Congratulations, Rahul! Based on these preliminary details, you meet the initial criteria for our pre-approved Loan Against Property. A senior loan expert from Home Credit will call you back shortly to provide your exact interest rate and guide you through the final steps. Thank you for your valued relationship, and have a wonderful day!" }
    ]
  },
  {
    id: "scenario_2_agricultural_disqualification",
    title: "Scenario 2: Agricultural Disqualification",
    category: "Immediate Boundary Failure",
    outcome: "DISQUALIFIED (Step 1)",
    badgeClass: "badge-danger",
    file: "../audio/scenario_2_agricultural_disqualification.wav",
    transcript: [
      { speaker: "agent", text: "Hello, am I speaking with Mr. Vikram Patel?" },
      { speaker: "customer", text: "Yes, Vikram here." },
      { speaker: "agent", text: "Great! Do you have two minutes to speak regarding your account?" },
      { speaker: "customer", text: "Yeah, go ahead." },
      { speaker: "agent", text: "As one of our valued customers, you have been selected for a pre-approved Loan Against Property offer of up to 75 lakhs as a loyalty reward. I'd love to check a few quick eligibility details. May we proceed?" },
      { speaker: "customer", text: "Sure, tell me what you need." },
      { speaker: "agent", text: "Wonderful! What type of property do you have—is it residential, commercial, or industrial?" },
      { speaker: "customer", text: "Well, it's my ancestral agricultural farmland in Gujarat." },
      { speaker: "agent", text: "Thank you for sharing, Vikram. Currently, this specific offer is only available for residential, commercial, or industrial properties. Unfortunately, we cannot proceed with agricultural land today. Thank you for banking with Home Credit!" }
    ]
  },
  {
    id: "scenario_3_cash_income_disqualification",
    title: "Scenario 3: Cash Income Disqualification",
    category: "Immediate Boundary Failure",
    outcome: "DISQUALIFIED (Step 5)",
    badgeClass: "badge-danger",
    file: "../audio/scenario_3_cash_income_disqualification.wav",
    transcript: [
      { speaker: "agent", text: "Hello, am I speaking with Amit Verma?" },
      { speaker: "customer", text: "Yes, Amit speaking." },
      { speaker: "agent", text: "Do you have two minutes to speak regarding a pre-approved Loan Against Property offer?" },
      { speaker: "customer", text: "Sure, I am free." },
      { speaker: "agent", text: "What type of property do you have?" },
      { speaker: "customer", text: "It's a residential flat, solely owned by me, with original papers ready." },
      { speaker: "agent", text: "How much loan amount are you looking to borrow?" },
      { speaker: "customer", text: "I need around 30 lakhs." },
      { speaker: "agent", text: "Are you salaried or self-employed, and is your monthly income received via bank transfer or cash?" },
      { speaker: "customer", text: "I run a retail shop, so I'm self-employed, and my daily income comes completely in cash." },
      { speaker: "agent", text: "Thank you for providing those details. Under our current policy, this offer requires income to be credited directly through a bank account. Since it is received in cash, we cannot proceed today. Thank you for choosing Home Credit!" }
    ]
  },
  {
    id: "scenario_4_missing_documents_disqualification",
    title: "Scenario 4: Missing Documents (Photocopies Only)",
    category: "Immediate Boundary Failure",
    outcome: "DISQUALIFIED (Step 3)",
    badgeClass: "badge-danger",
    file: "../audio/scenario_4_missing_documents_disqualification.wav",
    transcript: [
      { speaker: "agent", text: "Hello, am I speaking with Priya Nair?" },
      { speaker: "customer", text: "Yes, this is Priya." },
      { speaker: "agent", text: "Do you have two minutes to speak regarding a special Loan Against Property offer of up to 75 lakhs?" },
      { speaker: "customer", text: "Yes, tell me." },
      { speaker: "agent", text: "What type of property do you have?" },
      { speaker: "customer", text: "It's a commercial office, solely owned by me." },
      { speaker: "agent", text: "Do you have the original property documents available for verification?" },
      { speaker: "customer", text: "Actually no, I only have photocopies right now. The original documents are misplaced." },
      { speaker: "agent", text: "Thank you for clarifying. For this pre-approved offer, having original property documents available is a mandatory requirement. As they are unavailable, we won't be able to proceed at this time. Thank you for your time!" }
    ]
  },
  {
    id: "scenario_7_loan_ceiling_negotiation",
    title: "Scenario 7: Amount > 75L Ceiling Accepted",
    category: "Boundary Negotiation",
    outcome: "QUALIFIED -> HANDOFF",
    badgeClass: "badge-success",
    file: "../audio/scenario_7_loan_ceiling_negotiation.wav",
    transcript: [
      { speaker: "agent", text: "Hello, am I speaking with Kunal Mehta?" },
      { speaker: "customer", text: "Yes, Kunal speaking." },
      { speaker: "agent", text: "Do you have two minutes to speak regarding your pre-approved Loan Against Property offer?" },
      { speaker: "customer", text: "Yes, go ahead." },
      { speaker: "agent", text: "What type of property do you have?" },
      { speaker: "customer", text: "It's an industrial godown, solely owned, with original documents available." },
      { speaker: "agent", text: "How much loan amount are you looking to borrow?" },
      { speaker: "customer", text: "I have major expansion plans, so I need 90 lakhs." },
      { speaker: "agent", text: "Our current pre-approved offer has a maximum limit of 75 lakhs. Would you like to proceed with the maximum allowed amount of 75 lakhs?" },
      { speaker: "customer", text: "Yes, 75 lakhs works fine for me as well." },
      { speaker: "agent", text: "Great! Are you salaried or self-employed, and is your income in bank or cash?" },
      { speaker: "customer", text: "Self-employed, and all revenue is credited to my current bank account." },
      { speaker: "agent", text: "What is the approximate market value of the property?" },
      { speaker: "customer", text: "Around 1.8 crore." },
      { speaker: "agent", text: "And how many years would you prefer to repay the loan?" },
      { speaker: "customer", text: "12 years." },
      { speaker: "agent", text: "Congratulations, Kunal! You meet the initial criteria for our pre-approved Loan Against Property. A senior loan expert from Home Credit will call you back shortly to provide your exact interest rate. Have a wonderful day!" }
    ]
  },
  {
    id: "scenario_9_existing_loan_transfer",
    title: "Scenario 9: Transfer Switch (Existing Loan)",
    category: "Transfer Switch",
    outcome: "TRANSFERRED TO SPECIALIST",
    badgeClass: "badge-pending",
    file: "../audio/scenario_9_existing_loan_transfer.wav",
    transcript: [
      { speaker: "agent", text: "Hello, am I speaking with Sneha Iyer?" },
      { speaker: "customer", text: "Yes, Sneha speaking." },
      { speaker: "agent", text: "As one of our valued customers, you have been selected for a pre-approved Loan Against Property offer of up to 75 lakhs. May we check your eligibility?" },
      { speaker: "customer", text: "Actually, I already have an ongoing home loan running on this property with another bank." },
      { speaker: "agent", text: "Thank you for sharing that. Since you already have an existing loan on the property, this will be handled directly by our Loan Transfer Specialist. A specialist will contact you shortly to assist you. Thank you for your time with Home Credit!" }
    ]
  },
  {
    id: "scenario_11_busy_customer_callback",
    title: "Scenario 11: Busy Customer Callback",
    category: "Dialogue Gate",
    outcome: "CALLBACK RECORDED",
    badgeClass: "badge-pending",
    file: "../audio/scenario_11_busy_customer_callback.wav",
    transcript: [
      { speaker: "agent", text: "Hello, am I speaking with Sunita Rao?" },
      { speaker: "customer", text: "Yes, but I am heading into an urgent client meeting right now." },
      { speaker: "agent", text: "I completely understand. What would be a convenient time for us to call you back?" },
      { speaker: "customer", text: "Please call me tomorrow at 4 PM." },
      { speaker: "agent", text: "Thank you, Sunita. We will connect with you then. Have a wonderful day!" }
    ]
  },
  {
    id: "scenario_12_out_of_order_extraction",
    title: "Scenario 12: Multi-Slot Out-of-Order + Rate",
    category: "Cognitive State Engine",
    outcome: "QUALIFIED -> HANDOFF",
    badgeClass: "badge-success",
    file: "../audio/scenario_12_out_of_order_extraction.wav",
    transcript: [
      { speaker: "agent", text: "Hello, am I speaking with Deepak Joshi?" },
      { speaker: "customer", text: "Yes, speaking." },
      { speaker: "agent", text: "Do you have two minutes to check eligibility for our pre-approved Loan Against Property offer?" },
      { speaker: "customer", text: "Yes. I have a commercial shop worth 1.5 crore, jointly owned with my brother, but what interest rate do you offer?" },
      { speaker: "agent", text: "Our exact interest rates are tailored based on property valuation, and our senior loan expert will share the exact figures with you. May I know if you have the original property documents available for verification?" },
      { speaker: "customer", text: "Yes, the original registry papers are at home." },
      { speaker: "agent", text: "Perfect. How much loan amount are you looking to borrow?" },
      { speaker: "customer", text: "I need 60 lakhs." },
      { speaker: "agent", text: "Are you salaried or self-employed, and is your monthly income received via bank transfer or cash?" },
      { speaker: "customer", text: "Self-employed with bank income." },
      { speaker: "agent", text: "And how many years would you prefer to repay the loan?" },
      { speaker: "customer", text: "8 years." },
      { speaker: "agent", text: "Congratulations, Deepak! You meet the initial criteria. A senior loan expert from Home Credit will call you back shortly to provide your exact interest rate. Have a great day!" }
    ]
  }
];

// ==============================================================================
// State Engine Implementation
// ==============================================================================
class LAPVoiceSession {
  constructor() {
    this.reset();
  }

  reset() {
    this.customerName = "Rahul Sharma";
    this.agentName = "Priya";
    this.agentGender = "Female";
    this.companyName = "Home Credit";

    this.customerVerified = null;
    this.customerBusy = null;
    this.callbackTime = null;
    this.offerAccepted = null;
    this.isTransferCase = false;
    this.isDisqualified = false;
    this.callEnded = false;
    this.handoffComplete = false;
    this.awaiting75lDecision = false;
    this.currentAskedItem = null;

    this.state = {
      property_type: null,
      ownership_status: null,
      documents_available: null,
      loan_amount: null,
      occupation: null,
      income_mode: null,
      market_value: null,
      tenure_years: null
    };

    this.history = [];
  }

  startCall() {
    const greeting = `Hello, am I speaking with ${this.customerName}?`;
    this.history.push({ speaker: "agent", text: greeting });
    return greeting;
  }

  parseSlots(text) {
    const lower = text.toLowerCase();

    // Transfer Switch
    if (["existing loan", "already have a loan", "home loan running", "reduce my emi", "reduce emi", "transfer my loan"].some(k => lower.includes(k))) {
      this.isTransferCase = true;
      return;
    }

    // Property Type
    if (lower.includes("agricultural") || lower.includes("farmland") || lower.includes("kheti")) {
      this.state.property_type = "AGRICULTURAL";
    } else if (lower.includes("residential") || lower.includes("flat") || lower.includes("apartment") || lower.includes("house")) {
      this.state.property_type = "RESIDENTIAL";
    } else if (lower.includes("commercial") || lower.includes("shop") || lower.includes("office") || lower.includes("dukaan")) {
      this.state.property_type = "COMMERCIAL";
    } else if (lower.includes("industrial") || lower.includes("factory") || lower.includes("godown")) {
      this.state.property_type = "INDUSTRIAL";
    }

    // Ownership
    if (lower.includes("joint") || lower.includes("wife") || lower.includes("spouse") || lower.includes("brother") || lower.includes("partner")) {
      this.state.ownership_status = "JOINT";
    } else if (lower.includes("sole") || lower.includes("alone") || lower.includes("myself") || lower.includes("my own")) {
      this.state.ownership_status = "SOLE";
    }

    // Documents
    if (lower.includes("photocopy") || lower.includes("xerox") || lower.includes("misplaced") || lower.includes("lost")) {
      this.state.documents_available = "PHOTOCOPY_ONLY";
    } else if (lower.includes("original") || lower.includes("registry") || lower.includes("papers are at home") || lower.includes("papers ready")) {
      this.state.documents_available = "ORIGINAL";
    }

    // Market Value vs Loan Amount
    const isMvContext = ["worth", "valuation", "market value", "valued"].some(k => lower.includes(k)) || this.currentAskedItem === "market_value";
    const isLoanContext = ["need", "borrow", "looking for", "loan of", "loan amount"].some(k => lower.includes(k)) || this.currentAskedItem === "loan_amount";

    if (isMvContext) {
      const mvMatch = lower.match(/(\d+(\.\d+)?)\s*(cr|crore|lakh|lakhs)/);
      if (mvMatch) this.state.market_value = `${mvMatch[1]} ${mvMatch[3]}`;
    }

    if ((isLoanContext || this.state.loan_amount === null) && !(lower.includes("worth") && !lower.includes("need") && !lower.includes("loan"))) {
      const amtMatch = lower.match(/(\d+(\.\d+)?)\s*(lakh|lakhs|cr|crore)/);
      if (amtMatch) {
        let num = parseFloat(amtMatch[1]);
        if (amtMatch[3].includes("cr")) num *= 100;
        this.state.loan_amount = Math.round(num * 100000);
      }
    }

    // Occupation & Income
    if (lower.includes("salaried") || lower.includes("job") || lower.includes("company")) {
      this.state.occupation = "SALARIED";
    } else if (lower.includes("self-employed") || lower.includes("business") || lower.includes("firm")) {
      this.state.occupation = "SELF_EMPLOYED";
    }

    if (lower.includes("cash") || lower.includes("nagad")) {
      this.state.income_mode = "CASH";
    } else if (lower.includes("bank") || lower.includes("cheque") || lower.includes("account") || lower.includes("transfer")) {
      this.state.income_mode = "BANK";
    }

    // Tenure
    const tenureMatch = lower.match(/(\d+)\s*(year|years|saal)/);
    if (tenureMatch) {
      this.state.tenure_years = parseInt(tenureMatch[1]);
    }
  }

  getNextQuestion() {
    if (this.state.property_type === null) {
      return ["property_type", "What type of property do you have—is it residential, commercial, or industrial?"];
    }
    if (this.state.ownership_status === null) {
      return ["ownership_status", "Is the property solely owned by you, or is it a joint ownership?"];
    }
    if (this.state.documents_available === null) {
      return ["documents_available", "Do you have the original property documents available for verification?"];
    }
    if (this.state.loan_amount === null) {
      return ["loan_amount", "How much loan amount are you looking to borrow?"];
    }
    if (this.state.occupation === null || this.state.income_mode === null) {
      if (this.state.occupation === null && this.state.income_mode === null) {
        return ["occupation_income", "Are you salaried or self-employed, and is your monthly income received via bank transfer or cash?"];
      } else if (this.state.income_mode === null) {
        return ["income_mode", "Is your monthly income received via direct bank transfer or in cash?"];
      } else {
        return ["occupation", "Are you salaried or self-employed?"];
      }
    }
    if (this.state.market_value === null) {
      return ["market_value", "What is the approximate current market value of your property?"];
    }
    if (this.state.tenure_years === null) {
      return ["tenure_years", "How many years would you prefer to repay the loan?"];
    }
    return null;
  }

  processTurn(userText) {
    this.history.push({ speaker: "customer", text: userText });
    const lower = userText.toLowerCase();

    // 1. Verification
    if (this.customerVerified === null) {
      if (["yes", "speaking", "myself", "haan", "i am", "this is"].some(k => lower.includes(k))) {
        this.customerVerified = true;
        return "Great! Do you have two minutes to speak regarding your account?";
      } else if (lower.includes("who is this") || lower.includes("kaun")) {
        return `I am ${this.agentName} calling from ${this.companyName}. May I confirm if this is ${this.customerName}?`;
      } else {
        this.callEnded = true;
        return "I apologize for the disturbance. Have a good day!";
      }
    }

    // 2. Busy Check
    if (this.customerBusy === null) {
      if (["busy", "meeting", "driving", "call later", "not now"].some(k => lower.includes(k))) {
        this.customerBusy = true;
        return "I completely understand. What would be a convenient time for us to call you back?";
      } else {
        this.customerBusy = false;
        return `As one of our valued customers, you have been selected for a pre-approved Loan Against Property offer of up to ₹75 lakhs as a loyalty reward. I'd love to check a few quick eligibility details to see if this suits your needs. May we proceed?`;
      }
    }

    // Callback time
    if (this.customerBusy === true && this.callbackTime === null) {
      this.callbackTime = userText.trim();
      this.callEnded = true;
      return `Thank you, ${this.customerName}. We will connect with you then. Have a wonderful day!`;
    }

    // 3. Offer Acceptance
    if (this.offerAccepted === null) {
      if (["no", "not interested", "nahi chahiye", "don't want"].some(k => lower.includes(k))) {
        this.offerAccepted = false;
        this.callEnded = true;
        return `No problem at all, ${this.customerName}. Thank you for your time with ${this.companyName}. Have a great day!`;
      } else {
        this.offerAccepted = true;
      }
    }

    // Loan ceiling negotiation
    if (this.awaiting75lDecision) {
      if (["yes", "proceed", "fine", "okay", "sure", "chalega", "works"].some(k => lower.includes(k))) {
        this.state.loan_amount = 7500000;
        this.awaiting75lDecision = false;
      } else {
        this.isDisqualified = true;
        this.callEnded = true;
        return `I completely understand. Since your requirement exceeds our ₹75 lakh limit, we won't be able to proceed with this offer today. Thank you for your time with ${this.companyName}!`;
      }
    }

    // Extract slots
    this.parseSlots(userText);

    // Transfer switch check
    if (this.isTransferCase) {
      this.callEnded = true;
      return `Thank you for sharing that. Since you already have an existing loan on the property, this will be handled directly by our Loan Transfer Specialist. A specialist will contact you shortly. Thank you for your time with ${this.companyName}!`;
    }

    // Disqualification Checks
    if (this.state.property_type === "AGRICULTURAL") {
      this.isDisqualified = true;
      this.callEnded = true;
      return `Thank you for sharing. Currently, this specific offer is only available for residential, commercial, or industrial properties. Unfortunately, we cannot proceed with agricultural land today. Thank you for banking with ${this.companyName}!`;
    }

    if (["PHOTOCOPY_ONLY", "UNAVAILABLE"].includes(this.state.documents_available)) {
      this.isDisqualified = true;
      this.callEnded = true;
      return `Thank you for clarifying. For this pre-approved offer, having original property documents available is a mandatory requirement. As they are unavailable, we won't be able to proceed at this time. Thank you for your time!`;
    }

    if (this.state.loan_amount !== null && this.state.loan_amount > 7500000 && !this.awaiting75lDecision) {
      this.awaiting75lDecision = true;
      return "Our current pre-approved offer has a maximum limit of ₹75 lakhs. Would you like to proceed with the maximum allowed amount of ₹75 lakhs?";
    }

    if (this.state.income_mode === "CASH") {
      this.isDisqualified = true;
      this.callEnded = true;
      return `Thank you for providing those details. Under our current policy, this offer requires income to be credited directly through a bank account. Since it is received in cash, we cannot proceed today. Thank you for choosing ${this.companyName}!`;
    }

    if (this.state.tenure_years !== null && (this.state.tenure_years < 3 || this.state.tenure_years > 15)) {
      this.isDisqualified = true;
      this.callEnded = true;
      return `Thank you for sharing your preference. The repayment tenure for this offer must be between 3 and 15 years. Since your requested tenure falls outside this range, we are unable to process this application today. Thank you for your time with ${this.companyName}!`;
    }

    // Rate diversion check
    let ratePrefix = "";
    if (["interest rate", "rate of interest", "roi", "byaaj"].some(k => lower.includes(k))) {
      ratePrefix = "Our exact interest rates are tailored based on property valuation, and our senior loan expert will share the exact figures with you. ";
    }

    // Find next missing item
    const nextItem = this.getNextQuestion();
    if (nextItem) {
      const [key, qText] = nextItem;
      this.currentAskedItem = key;
      return `${ratePrefix}${qText}`.trim();
    } else {
      this.handoffComplete = true;
      this.callEnded = true;
      return `Congratulations, ${this.customerName}! Based on these preliminary details, you meet the initial criteria for our pre-approved Loan Against Property. A senior loan expert from ${this.companyName} will call you back shortly to provide your exact interest rate and guide you through the final steps. Thank you for your valued relationship, and have a wonderful day!`;
    }
  }
}

// ==============================================================================
// UI Controller
// ==============================================================================
let activeSession = new LAPVoiceSession();
let ttsEnabled = true;

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initSimulator();
  initRecordingsTab();
  initPromptTab();
});

function initTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      const targetPane = document.getElementById(`tab-${tab.dataset.tab}`);
      if (targetPane) targetPane.classList.add("active");
    });
  });
}

function initSimulator() {
  const viewport = document.getElementById("chat-viewport");
  const input = document.getElementById("user-input-box");
  const sendBtn = document.getElementById("btn-send-message");
  const restartBtn = document.getElementById("btn-restart-call");
  const ttsBtn = document.getElementById("btn-toggle-tts");

  ttsBtn.addEventListener("click", () => {
    ttsEnabled = !ttsEnabled;
    ttsBtn.classList.toggle("active", ttsEnabled);
  });

  restartBtn.addEventListener("click", () => {
    activeSession.reset();
    viewport.innerHTML = "";
    updateSidebarUI();
    const greeting = activeSession.startCall();
    appendBubble("agent", greeting);
    speakText(greeting);
  });

  sendBtn.addEventListener("click", handleUserSend);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleUserSend();
  });

  // Preset chips
  document.querySelectorAll(".preset-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      loadScenarioPreset(chip.dataset.scenario);
    });
  });

  // Start initial call
  const initialGreeting = activeSession.startCall();
  appendBubble("agent", initialGreeting);
  updateSidebarUI();
}

function handleUserSend() {
  const input = document.getElementById("user-input-box");
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  appendBubble("customer", text);

  // Animate waveform
  const waveform = document.getElementById("waveform");
  waveform.classList.add("active");

  setTimeout(() => {
    const response = activeSession.processTurn(text);
    appendBubble("agent", response);
    updateSidebarUI();
    waveform.classList.remove("active");
    speakText(response);
  }, 450);
}

function appendBubble(speaker, text) {
  const viewport = document.getElementById("chat-viewport");
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${speaker}`;
  bubble.textContent = text;
  viewport.appendChild(bubble);
  viewport.scrollTop = viewport.scrollHeight;
}

function speakText(text) {
  if (!ttsEnabled || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1.05;
  const voices = window.speechSynthesis.getVoices();
  const femaleVoice = voices.find(v => v.name.includes("Zira") || v.name.includes("Heera") || v.name.includes("Female") || v.lang.includes("en-IN"));
  if (femaleVoice) utter.voice = femaleVoice;
  window.speechSynthesis.speak(utter);
}

function updateSidebarUI() {
  const badge = document.getElementById("qualification-badge");
  const counter = document.getElementById("checklist-counter");
  const fill = document.getElementById("progress-fill");
  const dispDesc = document.getElementById("disp-desc");

  const st = activeSession.state;
  let filledCount = 0;

  // 1. Property Type
  updateSlotBadge("slot-property_type", st.property_type, st.property_type === "AGRICULTURAL" ? "invalid" : (st.property_type ? "valid" : null));
  if (st.property_type) filledCount++;

  // 2. Ownership
  updateSlotBadge("slot-ownership_status", st.ownership_status, st.ownership_status ? "valid" : null);
  if (st.ownership_status) filledCount++;

  // 3. Documents
  const docValid = st.documents_available === "ORIGINAL" ? "valid" : (st.documents_available ? "invalid" : null);
  updateSlotBadge("slot-documents_available", st.documents_available, docValid);
  if (st.documents_available) filledCount++;

  // 4. Loan Amount
  const amtValid = st.loan_amount && st.loan_amount <= 7500000 ? "valid" : (st.loan_amount ? "invalid" : null);
  const amtDisplay = st.loan_amount ? `₹${(st.loan_amount / 100000).toFixed(0)} Lakhs` : "UNKNOWN";
  updateSlotBadge("slot-loan_amount", amtDisplay, amtValid);
  if (st.loan_amount) filledCount++;

  // 5. Occupation & Income
  const occIncDisplay = (st.occupation || st.income_mode) ? `${st.occupation || '?'} / ${st.income_mode || '?'}` : "UNKNOWN";
  const occIncValid = st.income_mode === "CASH" ? "invalid" : ((st.occupation && st.income_mode) ? "valid" : null);
  updateSlotBadge("slot-occupation_income", occIncDisplay, occIncValid);
  if (st.occupation && st.income_mode) filledCount++;

  // 6. Market Value
  updateSlotBadge("slot-market_value", st.market_value, st.market_value ? "valid" : null);
  if (st.market_value) filledCount++;

  // 7. Tenure
  const tenureValid = st.tenure_years && (st.tenure_years >= 3 && st.tenure_years <= 15) ? "valid" : (st.tenure_years ? "invalid" : null);
  const tenureDisplay = st.tenure_years ? `${st.tenure_years} Years` : "UNKNOWN";
  updateSlotBadge("slot-tenure_years", tenureDisplay, tenureValid);
  if (st.tenure_years) filledCount++;

  // Update Progress
  const pct = Math.round((filledCount / 7) * 100);
  counter.textContent = `${filledCount} / 7 Completed`;
  fill.style.width = `${pct}%`;

  // Outcome badges
  if (activeSession.handoffComplete) {
    badge.className = "badge-success";
    badge.textContent = "QUALIFIED & HANDED OFF";
    dispDesc.innerHTML = "✅ <b>Lead Qualified!</b> Transferred to Senior Human Loan Expert to finalize interest rates.";
  } else if (activeSession.isDisqualified) {
    badge.className = "badge-danger";
    badge.textContent = "DISQUALIFIED";
    dispDesc.innerHTML = "❌ <b>Disqualified.</b> Customer politely informed and call terminated cleanly.";
  } else if (activeSession.isTransferCase) {
    badge.className = "badge-pending";
    badge.textContent = "LOAN TRANSFER SPECIALIST";
    dispDesc.innerHTML = "🔄 <b>Transfer Switch Triggered.</b> Diverted to Balance Transfer Specialist.";
  } else if (activeSession.callbackTime) {
    badge.className = "badge-pending";
    badge.textContent = "CALLBACK SCHEDULED";
    dispDesc.innerHTML = `📅 <b>Customer Busy.</b> Callback noted: "${activeSession.callbackTime}".`;
  } else {
    badge.className = "badge-pending";
    badge.textContent = "In Progress";
    dispDesc.textContent = "Collecting preliminary qualification criteria sequentially...";
  }
}

function updateSlotBadge(elementId, value, statusClass) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const valEl = el.querySelector(".slot-val");
  const statusEl = el.querySelector(".slot-status");

  valEl.textContent = value || "UNKNOWN";
  el.className = "slot-item";

  if (statusClass === "valid") {
    el.classList.add("valid");
    statusEl.textContent = "Passed";
  } else if (statusClass === "invalid") {
    el.classList.add("invalid");
    statusEl.textContent = "Failed";
  } else {
    statusEl.textContent = "Pending";
  }
}

function loadScenarioPreset(presetId) {
  const scenarioMap = {
    "1": ["Yes, this is Rahul.", "Sure, I have 2 minutes.", "Yes, proceed.", "It's a residential apartment.", "Solely owned by me.", "Yes, original papers are ready.", "50 lakhs.", "Salaried, direct bank transfer.", "Worth 1.2 crore.", "10 years."],
    "2": ["Yes, speaking.", "Yes, go ahead.", "Sure.", "It is an agricultural farmland in Gujarat."],
    "3": ["Yes, speaking.", "Sure.", "Proceed.", "Residential flat.", "Joint with wife.", "Originals ready.", "30 lakhs.", "I am self-employed running a shop, and all income is in cash."],
    "4": ["Yes, Rahul here.", "Sure.", "Proceed.", "Commercial shop.", "Sole owner.", "No, only photocopies, originals are lost."],
    "7": ["Yes, speaking.", "Go ahead.", "Interested.", "Industrial warehouse.", "Sole owner.", "Originals ready.", "I need 90 lakhs.", "Yes, 75 lakhs works fine for me.", "Self-employed, bank transfer.", "1.8 crore.", "12 years."],
    "9": ["Yes, speaking.", "Sure.", "Actually, I already have an ongoing home loan on this property with another bank."],
    "11": ["Yes, this is Rahul.", "I am busy in an urgent meeting right now.", "Please call tomorrow at 4 PM."],
    "12": ["Yes, speaking.", "Sure.", "I have a commercial shop worth 1.5 crore, jointly owned with my brother, but what interest rate do you offer?", "Yes, original papers are available.", "60 lakhs.", "Self-employed, bank account.", "8 years."]
  };

  const turns = scenarioMap[presetId];
  if (!turns) return;

  activeSession.reset();
  document.getElementById("chat-viewport").innerHTML = "";
  const greeting = activeSession.startCall();
  appendBubble("agent", greeting);
  updateSidebarUI();

  let delay = 600;
  turns.forEach(turn => {
    setTimeout(() => {
      if (activeSession.callEnded) return;
      appendBubble("customer", turn);
      setTimeout(() => {
        const reply = activeSession.processTurn(turn);
        appendBubble("agent", reply);
        updateSidebarUI();
      }, 350);
    }, delay);
    delay += 1100;
  });
}

function initRecordingsTab() {
  const container = document.getElementById("audio-cards-container");
  const player = document.getElementById("main-audio-player");
  const transcriptBox = document.getElementById("recording-transcript");
  const titleEl = document.getElementById("current-recording-title");
  const pillEl = document.getElementById("current-recording-pill");

  AUDIO_SCENARIOS.forEach((sc, idx) => {
    const card = document.createElement("div");
    card.className = `audio-card ${idx === 0 ? "active" : ""}`;
    card.innerHTML = `
      <div class="card-title-row">
        <h4>${sc.title}</h4>
        <span class="${sc.badgeClass}">${sc.outcome}</span>
      </div>
      <div class="card-meta">Category: ${sc.category}</div>
    `;

    card.addEventListener("click", () => {
      document.querySelectorAll(".audio-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      loadRecording(sc);
    });

    container.appendChild(card);
  });

  // Load first recording by default
  loadRecording(AUDIO_SCENARIOS[0]);

  function loadRecording(sc) {
    titleEl.textContent = sc.title;
    pillEl.className = sc.badgeClass;
    pillEl.textContent = sc.outcome;

    player.src = sc.file;
    player.load();

    transcriptBox.innerHTML = "";
    sc.transcript.forEach(t => {
      const line = document.createElement("div");
      line.className = `transcript-turn ${t.speaker}`;
      line.innerHTML = `<b>${t.speaker === 'agent' ? 'Priya (Agent)' : 'Customer'}:</b> "${t.text}"`;
      transcriptBox.appendChild(line);
    });
  }
}

function initPromptTab() {
  fetch("../system_prompt.txt")
    .then(res => res.text())
    .then(text => {
      document.getElementById("prompt-content-code").textContent = text;
    })
    .catch(() => {
      document.getElementById("prompt-content-code").textContent = "Loaded via local file system. Review system_prompt.txt in workspace root.";
    });

  document.getElementById("btn-copy-prompt").addEventListener("click", () => {
    const code = document.getElementById("prompt-content-code").textContent;
    navigator.clipboard.writeText(code).then(() => {
      alert("System Prompt copied to clipboard!");
    });
  });
}

#!/usr/bin/env python3
"""
Home Credit LAP AI Voice Agent - Simulator & Automated Test Suite
Simulates the conversational state machine, entity extraction engine,
business eligibility validation, and turn-taking orchestration.
"""

import sys
import re
from typing import Dict, Any, List, Optional, Tuple

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

class LAPVoiceAgentSimulator:
    def __init__(self, 
                 company_name: str = "Home Credit",
                 customer_name: str = "Rahul Sharma",
                 agent_name: str = "Priya",
                 agent_gender: str = "Female",
                 language_to_speak: str = "English",
                 rag_context: str = "Home Credit offers LAP for residential, commercial, industrial properties up to 75 Lakhs."):
        self.company_name = company_name
        self.customer_name = customer_name
        self.agent_name = agent_name
        self.agent_gender = agent_gender
        self.language_to_speak = language_to_speak
        self.rag_context = rag_context

        # Dialogue & Qualification State Machine
        self.customer_verified: Optional[bool] = None
        self.customer_busy: Optional[bool] = None
        self.callback_time: Optional[str] = None
        self.offer_accepted: Optional[bool] = None
        self.is_transfer_case: bool = False
        self.is_disqualified: bool = False
        self.disqualification_reason: Optional[str] = None
        self.call_ended: bool = False
        self.handoff_complete: bool = False
        self.awaiting_75l_decision: bool = False
        self.current_asked_item: Optional[str] = None

        # The 7 Qualification Checklist Variables
        self.state: Dict[str, Any] = {
            "property_type": None,          # 'RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'AGRICULTURAL'
            "ownership_status": None,       # 'SOLE', 'JOINT'
            "documents_available": None,    # 'ORIGINAL', 'PHOTOCOPY_ONLY', 'UNAVAILABLE'
            "loan_amount": None,            # int in INR
            "occupation": None,             # 'SALARIED', 'SELF_EMPLOYED'
            "income_mode": None,            # 'BANK', 'CASH'
            "market_value": None,           # str / int
            "tenure_years": None            # int (3 to 15)
        }

        self.history: List[Dict[str, str]] = []

    def get_initial_greeting(self) -> str:
        if self.language_to_speak.lower() == "hindi":
            inflection = "bol rahi hoon" if self.agent_gender.lower() == "female" else "bol raha hoon"
            msg = f"Namaste, kya meri baat {self.customer_name} ji se ho rahi hai? Main {self.company_name} se {self.agent_name} {inflection}."
        else:
            msg = f"Hello, am I speaking with {self.customer_name}?"
        self.history.append({"speaker": "agent", "text": msg})
        return msg

    def parse_utterance(self, text: str):
        """Extract multi-slot values, speech repairs, and flags from utterance."""
        lower = text.lower()

        # Check for transfer switch
        if any(k in lower for k in ["existing loan", "already have a loan", "home loan running", "reduce my emi", "reduce emi", "transfer my loan"]):
            self.is_transfer_case = True
            return

        # Check for speech repairs / corrections for property type
        if "agricultural" in lower or "farmland" in lower or "farm land" in lower or "kheti" in lower:
            self.state["property_type"] = "AGRICULTURAL"
        elif "residential" in lower or "flat" in lower or "apartment" in lower or "house" in lower or "makaan" in lower:
            self.state["property_type"] = "RESIDENTIAL"
        elif "commercial" in lower or "shop" in lower or "office" in lower or "dukaan" in lower:
            self.state["property_type"] = "COMMERCIAL"
        elif "industrial" in lower or "factory" in lower or "godown" in lower:
            self.state["property_type"] = "INDUSTRIAL"

        # Ownership
        if "joint" in lower or "wife" in lower or "spouse" in lower or "brother" in lower or "partner" in lower:
            self.state["ownership_status"] = "JOINT"
        elif "sole" in lower or "alone" in lower or "myself" in lower or "single owner" in lower or "my own" in lower:
            self.state["ownership_status"] = "SOLE"

        # Document availability
        if "photocopy" in lower or "xerox" in lower or "don't have original" in lower or "misplaced" in lower or "lost" in lower:
            self.state["documents_available"] = "PHOTOCOPY_ONLY"
        elif "original" in lower or "registry" in lower or "papers are at home" in lower or "papers available" in lower:
            self.state["documents_available"] = "ORIGINAL"

        # Market Value vs Loan Amount Extraction
        # Look for explicit market value keywords
        is_mv_context = any(k in lower for k in ["worth", "valuation", "market value", "valued", "property is"]) or (self.current_asked_item == "market_value")
        is_loan_context = any(k in lower for k in ["need", "borrow", "looking for", "loan of", "loan amount", "require"]) or (self.current_asked_item == "loan_amount")

        # Market Value parse
        if is_mv_context:
            mv_match = re.search(r'(\d+(\.\d+)?)\s*(cr|crore|lakh|lakhs)', lower)
            if mv_match:
                self.state["market_value"] = f"{mv_match.group(1)} {mv_match.group(3)}"
        elif "worth" in lower:
            mv_match = re.search(r'worth\s*(about|around)?\s*(\d+(\.\d+)?)\s*(cr|crore|lakh|lakhs)', lower)
            if mv_match:
                self.state["market_value"] = f"{mv_match.group(2)} {mv_match.group(4)}"

        # Loan Amount parse (only if not an explicit market value utterance without loan keywords)
        if (is_loan_context or self.state["loan_amount"] is None) and not ("worth" in lower and not any(k in lower for k in ["need", "borrow", "loan"])):
            amt_match = re.search(r'(\d+(\.\d+)?)\s*(lakh|lakhs|cr|crore)', lower)
            if amt_match:
                num = float(amt_match.group(1))
                unit = amt_match.group(3)
                if "cr" in unit:
                    num = num * 100
                self.state["loan_amount"] = int(num * 100000)

        # Occupation & Income Mode
        if "salaried" in lower or "job" in lower or "private company" in lower:
            self.state["occupation"] = "SALARIED"
        elif "self-employed" in lower or "business" in lower or "shopkeeper" in lower or "firm" in lower:
            self.state["occupation"] = "SELF_EMPLOYED"

        if "cash" in lower or "nagad" in lower:
            self.state["income_mode"] = "CASH"
        elif "bank" in lower or "cheque" in lower or "account" in lower or "direct deposit" in lower or "transfer" in lower:
            self.state["income_mode"] = "BANK"

        # Market Value
        mv_match = re.search(r'(worth|value|around|approx|lagbhag)\s*.*?(\d+(\.\d+)?)\s*(lakh|lakhs|cr|crore)', lower)
        if mv_match:
            self.state["market_value"] = f"{mv_match.group(2)} {mv_match.group(4)}"
        elif "crore" in lower or "cr" in lower:
            cr_match = re.search(r'(\d+(\.\d+)?)\s*(cr|crore)', lower)
            if cr_match:
                self.state["market_value"] = f"{cr_match.group(1)} crore"

        # Tenure detection
        tenure_match = re.search(r'(\d+)\s*(year|years|saal)', lower)
        if tenure_match:
            self.state["tenure_years"] = int(tenure_match.group(1))

    def get_first_missing_question(self) -> Optional[Tuple[str, str]]:
        """Identify earliest unanswered checklist item."""
        if self.state["property_type"] is None:
            return ("property_type", "What type of property do you have—is it residential, commercial, or industrial?")
        if self.state["ownership_status"] is None:
            return ("ownership_status", "Is the property solely owned by you, or is it a joint ownership?")
        if self.state["documents_available"] is None:
            return ("documents_available", "Do you have the original property documents available for verification?")
        if self.state["loan_amount"] is None:
            return ("loan_amount", "How much loan amount are you looking to borrow?")
        if self.state["occupation"] is None or self.state["income_mode"] is None:
            if self.state["occupation"] is None and self.state["income_mode"] is None:
                return ("occupation_income", "Are you salaried or self-employed, and is your monthly income received via bank transfer or cash?")
            elif self.state["income_mode"] is None:
                return ("income_mode", "Is your monthly income received via direct bank transfer or in cash?")
            else:
                return ("occupation", "Are you salaried or self-employed?")
        if self.state["market_value"] is None:
            return ("market_value", "What is the approximate current market value of your property?")
        if self.state["tenure_years"] is None:
            return ("tenure_years", "How many years would you prefer to repay the loan?")
        return None

    def process_turn(self, user_text: str) -> str:
        """Process one customer utterance and return the agent response."""
        self.history.append({"speaker": "customer", "text": user_text})
        lower = user_text.lower()

        # 1. Verification Stage
        if self.customer_verified is None:
            if any(k in lower for k in ["yes", "speaking", "myself", "haan", "i am", "this is"]):
                self.customer_verified = True
                reply = "Great! Do you have two minutes to speak regarding your account?"
                self.history.append({"speaker": "agent", "text": reply})
                return reply
            elif "who is this" in lower or "kaun" in lower:
                reply = f"I am {self.agent_name} calling from {self.company_name}. May I confirm if this is {self.customer_name}?"
                self.history.append({"speaker": "agent", "text": reply})
                return reply
            else:
                self.call_ended = True
                reply = f"I apologize for the disturbance. Have a good day!"
                self.history.append({"speaker": "agent", "text": reply})
                return reply

        # 2. Busy Check Stage
        if self.customer_busy is None:
            if any(k in lower for k in ["busy", "meeting", "driving", "call later", "not now", "samay nahi"]):
                self.customer_busy = True
                reply = "I completely understand. What would be a convenient time for us to call you back?"
                self.history.append({"speaker": "agent", "text": reply})
                return reply
            else:
                self.customer_busy = False
                reply = f"As one of our valued customers, you have been selected for a pre-approved Loan Against Property offer of up to ₹75 lakhs as a loyalty reward. I'd love to check a few quick eligibility details to see if this suits your needs. May we proceed?"
                self.history.append({"speaker": "agent", "text": reply})
                return reply

        # Callback time handling
        if self.customer_busy is True and self.callback_time is None:
            self.callback_time = user_text.strip()
            self.call_ended = True
            reply = f"Thank you, {self.customer_name}. We will connect with you then. Have a wonderful day!"
            self.history.append({"speaker": "agent", "text": reply})
            return reply

        # 3. Offer Acceptance Stage
        if self.offer_accepted is None:
            if any(k in lower for k in ["no", "not interested", "nahi chahiye", "don't want"]):
                self.offer_accepted = False
                self.call_ended = True
                reply = f"No problem at all, {self.customer_name}. Thank you for your time with {self.company_name}. Have a great day!"
                self.history.append({"speaker": "agent", "text": reply})
                return reply
            else:
                self.offer_accepted = True

        # Handle Ceiling Decision if in progress
        if self.awaiting_75l_decision:
            if any(k in lower for k in ["yes", "proceed", "fine", "okay", "sure", "chalega", "works"]):
                self.state["loan_amount"] = 7500000
                self.awaiting_75l_decision = False
            else:
                self.is_disqualified = True
                self.call_ended = True
                reply = f"I completely understand. Since your requirement exceeds our ₹75 lakh limit, we won't be able to proceed with this offer today. Thank you for your time with {self.company_name}!"
                self.history.append({"speaker": "agent", "text": reply})
                return reply

        # 4. Extract Multi-Slot Information from Utterance
        self.parse_utterance(user_text)

        # 5. Check Transfer Switch
        if self.is_transfer_case:
            self.call_ended = True
            reply = f"Thank you for sharing that. Since you already have an existing loan on the property, this will be handled directly by our Loan Transfer Specialist. A specialist will contact you shortly. Thank you for your time with {self.company_name}!"
            self.history.append({"speaker": "agent", "text": reply})
            return reply

        # 6. Check Immediate Disqualifications
        # a. Agricultural Property
        if self.state["property_type"] == "AGRICULTURAL":
            self.is_disqualified = True
            self.call_ended = True
            reply = f"Thank you for sharing. Currently, this specific offer is only available for residential, commercial, or industrial properties. Unfortunately, we cannot proceed with agricultural land today. Thank you for banking with {self.company_name}!"
            self.history.append({"speaker": "agent", "text": reply})
            return reply

        # b. Photocopy or missing documents
        if self.state["documents_available"] in ["PHOTOCOPY_ONLY", "UNAVAILABLE"]:
            self.is_disqualified = True
            self.call_ended = True
            reply = f"Thank you for clarifying. For this pre-approved offer, having original property documents available is a mandatory requirement. As they are unavailable, we won't be able to proceed at this time. Thank you for your time!"
            self.history.append({"speaker": "agent", "text": reply})
            return reply

        # c. Loan Amount > 75 Lakhs boundary
        if self.state["loan_amount"] is not None and self.state["loan_amount"] > 7500000 and not self.awaiting_75l_decision:
            self.awaiting_75l_decision = True
            reply = "Our current pre-approved offer has a maximum limit of ₹75 lakhs. Would you like to proceed with the maximum allowed amount of ₹75 lakhs?"
            self.history.append({"speaker": "agent", "text": reply})
            return reply

        # d. Cash income
        if self.state["income_mode"] == "CASH":
            self.is_disqualified = True
            self.call_ended = True
            reply = f"Thank you for providing those details. Under our current policy, this offer requires income to be credited directly through a bank account. Since it is received in cash, we cannot proceed today. Thank you for choosing {self.company_name}!"
            self.history.append({"speaker": "agent", "text": reply})
            return reply

        # e. Tenure bounds (3 to 15 years)
        if self.state["tenure_years"] is not None and (self.state["tenure_years"] < 3 or self.state["tenure_years"] > 15):
            self.is_disqualified = True
            self.call_ended = True
            reply = f"Thank you for sharing your preference. The repayment tenure for this offer must be between 3 and 15 years. Since your requested tenure falls outside this range, we are unable to process this application today. Thank you for your time with {self.company_name}!"
            self.history.append({"speaker": "agent", "text": reply})
            return reply

        # 7. Check Rate Diversion / Interruption
        diversion_prefix = ""
        if "interest rate" in lower or "rate of interest" in lower or "roi" in lower or "byaaj" in lower:
            diversion_prefix = "Our exact interest rates are tailored based on property valuation, and our senior loan expert will share the exact figures with you. "

        next_item = self.get_first_missing_question()
        if next_item:
            key, question = next_item
            self.current_asked_item = key
            reply = f"{diversion_prefix}{question}".strip()
            self.history.append({"speaker": "agent", "text": reply})
            return reply
        else:
            # ALL 7 ITEMS VERIFIED AND VALID -> POST-QUALIFICATION HANDOFF GATE
            self.handoff_complete = True
            self.call_ended = True
            reply = f"Congratulations, {self.customer_name}! Based on these preliminary details, you meet the initial criteria for our pre-approved Loan Against Property. A senior loan expert from {self.company_name} will call you back shortly to provide your exact interest rate and guide you through the final steps. Thank you for your valued relationship, and have a wonderful day!"
            self.history.append({"speaker": "agent", "text": reply})
            return reply


def run_automated_tests():
    print("=" * 80)
    print("RUNNING HOME CREDIT LAP VOICE AGENT REGRESSION TEST SUITE (14 SCENARIOS)")
    print("=" * 80)

    test_cases = [
        {
            "id": 1,
            "name": "Golden Path: Full Qualification (Salaried, Residential, Bank)",
            "turns": [
                "Yes, this is Rahul speaking.",
                "Sure, I have a couple of minutes.",
                "Yes, tell me more.",
                "It's a residential apartment.",
                "It is solely owned by me.",
                "Yes, I have the original documents ready.",
                "I am looking for around 50 lakhs.",
                "I am salaried, and my income comes directly to my bank account.",
                "It is worth about 1.2 crore.",
                "I prefer a 10 years tenure."
            ],
            "expect_handoff": True,
            "expect_disqualified": False,
            "expect_transfer": False
        },
        {
            "id": 2,
            "name": "Immediate Disqualification: Agricultural Property",
            "turns": [
                "Yes, speaking.",
                "Yes, go ahead.",
                "Sure.",
                "It is an agricultural farmland in Gujarat."
            ],
            "expect_handoff": False,
            "expect_disqualified": True,
            "expect_transfer": False
        },
        {
            "id": 3,
            "name": "Immediate Disqualification: Cash Income",
            "turns": [
                "Yes, speaking.",
                "Yes, available.",
                "Proceed.",
                "Residential house.",
                "Joint with my wife.",
                "Original papers are available.",
                "30 lakhs.",
                "I am self-employed running a shop, and my income is completely in cash."
            ],
            "expect_handoff": False,
            "expect_disqualified": True,
            "expect_transfer": False
        },
        {
            "id": 4,
            "name": "Immediate Disqualification: Missing Original Documents (Photocopy Only)",
            "turns": [
                "Yes, Rahul here.",
                "Yes, sure.",
                "Sounds good.",
                "Commercial office.",
                "Sole owner.",
                "No, I only have photocopy papers, originals are lost."
            ],
            "expect_handoff": False,
            "expect_disqualified": True,
            "expect_transfer": False
        },
        {
            "id": 5,
            "name": "Immediate Disqualification: Tenure Too Short (2 Years)",
            "turns": [
                "Yes, this is Rahul.",
                "Yes, free now.",
                "Yes, proceed.",
                "Residential flat.",
                "Sole ownership.",
                "Original papers available.",
                "25 lakhs.",
                "Salaried with bank salary.",
                "Worth 70 lakhs.",
                "I want a 2 years tenure."
            ],
            "expect_handoff": False,
            "expect_disqualified": True,
            "expect_transfer": False
        },
        {
            "id": 6,
            "name": "Immediate Disqualification: Tenure Too Long (20 Years)",
            "turns": [
                "Yes, this is Rahul.",
                "Yes, free now.",
                "Yes, proceed.",
                "Residential flat.",
                "Sole ownership.",
                "Original papers available.",
                "25 lakhs.",
                "Salaried with bank salary.",
                "Worth 70 lakhs.",
                "I need a 20 years tenure."
            ],
            "expect_handoff": False,
            "expect_disqualified": True,
            "expect_transfer": False
        },
        {
            "id": 7,
            "name": "Loan Ceiling Negotiation (> 75L Accepted)",
            "turns": [
                "Yes, Rahul speaking.",
                "Yes, tell me.",
                "Yes, interested.",
                "Industrial godown.",
                "Sole owner.",
                "Originals available.",
                "I need 90 lakhs.",
                "Yes, 75 lakhs works fine for me.",
                "Self-employed with bank income.",
                "Valued around 1.5 crore.",
                "12 years."
            ],
            "expect_handoff": True,
            "expect_disqualified": False,
            "expect_transfer": False
        },
        {
            "id": 8,
            "name": "Loan Ceiling Rejection (> 75L Declined)",
            "turns": [
                "Yes, Rahul speaking.",
                "Yes, go on.",
                "Yes.",
                "Commercial shop.",
                "Sole ownership.",
                "Originals available.",
                "I need 1 crore.",
                "No, 75 lakhs is too less, I cannot accept that."
            ],
            "expect_handoff": False,
            "expect_disqualified": True,
            "expect_transfer": False
        },
        {
            "id": 9,
            "name": "Transfer Switch: Existing Property Loan",
            "turns": [
                "Yes, Rahul speaking.",
                "Sure.",
                "Actually, I already have an existing loan running on this property."
            ],
            "expect_handoff": False,
            "expect_disqualified": False,
            "expect_transfer": True
        },
        {
            "id": 10,
            "name": "Transfer Switch: EMI Reduction Request",
            "turns": [
                "Yes, Rahul speaking.",
                "Sure.",
                "Can you help me reduce my emi on my mortgage?"
            ],
            "expect_handoff": False,
            "expect_disqualified": False,
            "expect_transfer": True
        },
        {
            "id": 11,
            "name": "Busy Customer Callback Flow",
            "turns": [
                "Yes, this is Rahul.",
                "I am busy right now in a meeting.",
                "Call me tomorrow at 4 PM."
            ],
            "expect_handoff": False,
            "expect_disqualified": False,
            "expect_transfer": False
        },
        {
            "id": 12,
            "name": "Multi-Slot Out-of-Order Extraction & Rate Diversion",
            "turns": [
                "Yes, this is Rahul.",
                "Yes, go ahead.",
                "I have a commercial shop worth 1.5 crore jointly owned with my brother, but what interest rate do you offer?",
                "Yes, original documents are available.",
                "I need 60 lakhs.",
                "Self-employed, income is in bank.",
                "8 years."
            ],
            "expect_handoff": True,
            "expect_disqualified": False,
            "expect_transfer": False
        },
        {
            "id": 13,
            "name": "Adversarial Contradiction & Speech Repair",
            "turns": [
                "Yes, speaking.",
                "Yes.",
                "Proceed.",
                "It is residential... wait, actually it is agricultural farmland."
            ],
            "expect_handoff": False,
            "expect_disqualified": True,
            "expect_transfer": False
        },
        {
            "id": 14,
            "name": "Bilingual Joint Ownership Happy Path",
            "turns": [
                "Yes, this is Rahul.",
                "Yes.",
                "Proceed.",
                "Residential apartment.",
                "Jointly owned with my wife.",
                "Original papers available at home.",
                "40 lakhs.",
                "Salaried and salary received in bank.",
                "Worth 80 lakhs.",
                "7 years."
            ],
            "expect_handoff": True,
            "expect_disqualified": False,
            "expect_transfer": False
        }
    ]

    passed_count = 0
    for tc in test_cases:
        agent = LAPVoiceAgentSimulator()
        agent.get_initial_greeting()
        for turn in tc["turns"]:
            agent.process_turn(turn)
            if agent.call_ended:
                break

        passed = (
            agent.handoff_complete == tc["expect_handoff"] and
            agent.is_disqualified == tc["expect_disqualified"] and
            agent.is_transfer_case == tc["expect_transfer"]
        )

        status = "PASSED [OK]" if passed else "FAILED [X]"
        if passed:
            passed_count += 1
        print(f"Test #{tc['id']:02d}: {tc['name']:<55} -> {status}")

    print("-" * 80)
    print(f"SUMMARY: {passed_count}/{len(test_cases)} Tests Passed Successfully.")
    print("=" * 80)
    return passed_count == len(test_cases)


def run_interactive_mode():
    print("=" * 80)
    print("HOME CREDIT LAP VOICE AGENT - INTERACTIVE TEST CONSOLE")
    print("Type your responses naturally as the customer. Type 'exit' or 'quit' to stop.")
    print("=" * 80)

    agent = LAPVoiceAgentSimulator()
    print(f"\nAGENT: {agent.get_initial_greeting()}\n")

    while not agent.call_ended:
        try:
            user_input = input("YOU: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nSession aborted.")
            break

        if not user_input:
            continue
        if user_input.lower() in ["exit", "quit"]:
            print("Exiting interactive test session.")
            break

        response = agent.process_turn(user_input)
        print(f"\nAGENT: {response}\n")

    print("\n[CALL TERMINATED]")
    print(f"Final State: {agent.state}")
    print(f"Qualified & Handed off: {agent.handoff_complete}")
    print(f"Disqualified: {agent.is_disqualified}")
    print(f"Transfer Case: {agent.is_transfer_case}")


if __name__ == "__main__":
    if "--run-tests" in sys.argv:
        success = run_automated_tests()
        sys.exit(0 if success else 1)
    elif "--interactive" in sys.argv:
        run_interactive_mode()
    else:
        # Default: run tests and show instructions
        run_automated_tests()
        print("\nTip: Run with --interactive to conduct a live conversation test in your terminal!")

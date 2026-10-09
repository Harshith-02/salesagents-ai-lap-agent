import os
import sys
import subprocess
import json

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

os.makedirs("audio", exist_ok=True)

# Curated dialogues for key test scenarios
SCENARIOS = {
    "scenario_1_golden_path": [
        ("agent", "Hello, am I speaking with Rahul Sharma?"),
        ("customer", "Yes, this is Rahul speaking."),
        ("agent", "Great! Do you have two minutes to speak regarding your account?"),
        ("customer", "Sure, I have a couple of minutes. What is this about?"),
        ("agent", "As one of our valued customers, you have been selected for a pre-approved Loan Against Property offer of up to 75 lakhs as a loyalty reward. I'd love to check a few quick eligibility details to see if this suits your needs. May we proceed?"),
        ("customer", "Yeah, sounds interesting. Let's do it."),
        ("agent", "Wonderful! What type of property do you have—is it residential, commercial, or industrial?"),
        ("customer", "It's a residential apartment."),
        ("agent", "Got it. Is the property solely owned by you, or is it a joint ownership?"),
        ("customer", "It's solely owned by me."),
        ("agent", "Understood. Do you have the original property documents available for verification?"),
        ("customer", "Yes, I have all the original papers at home."),
        ("agent", "Perfect. How much loan amount are you looking to borrow?"),
        ("customer", "Around 50 lakhs."),
        ("agent", "Noted. Are you salaried or self-employed, and is your monthly income received via bank transfer or cash?"),
        ("customer", "I am salaried working at an IT firm, and my salary comes directly into my bank account."),
        ("agent", "Great. What is the approximate current market value of your property?"),
        ("customer", "It should be around 1.2 crore."),
        ("agent", "Got it. And how many years would you prefer to repay the loan?"),
        ("customer", "I'd like a 10-year repayment period."),
        ("agent", "Congratulations, Rahul! Based on these preliminary details, you meet the initial criteria for our pre-approved Loan Against Property. A senior loan expert from Home Credit will call you back shortly to provide your exact interest rate and guide you through the final steps. Thank you for your valued relationship, and have a wonderful day!")
    ],
    "scenario_2_agricultural_disqualification": [
        ("agent", "Hello, am I speaking with Mr. Vikram Patel?"),
        ("customer", "Yes, Vikram here."),
        ("agent", "Great! Do you have two minutes to speak regarding your account?"),
        ("customer", "Yeah, go ahead."),
        ("agent", "As one of our valued customers, you have been selected for a pre-approved Loan Against Property offer of up to 75 lakhs as a loyalty reward. I'd love to check a few quick eligibility details. May we proceed?"),
        ("customer", "Sure, tell me what you need."),
        ("agent", "Wonderful! What type of property do you have—is it residential, commercial, or industrial?"),
        ("customer", "Well, it's my ancestral agricultural farmland in Gujarat."),
        ("agent", "Thank you for sharing, Vikram. Currently, this specific offer is only available for residential, commercial, or industrial properties. Unfortunately, we cannot proceed with agricultural land today. Thank you for banking with Home Credit!")
    ],
    "scenario_3_cash_income_disqualification": [
        ("agent", "Hello, am I speaking with Amit Verma?"),
        ("customer", "Yes, Amit speaking."),
        ("agent", "Do you have two minutes to speak regarding a pre-approved Loan Against Property offer?"),
        ("customer", "Sure, I am free."),
        ("agent", "What type of property do you have?"),
        ("customer", "It's a residential flat, solely owned by me, with original papers ready."),
        ("agent", "How much loan amount are you looking to borrow?"),
        ("customer", "I need around 30 lakhs."),
        ("agent", "Are you salaried or self-employed, and is your monthly income received via bank transfer or cash?"),
        ("customer", "I run a retail shop, so I'm self-employed, and my daily income comes completely in cash."),
        ("agent", "Thank you for providing those details. Under our current policy, this offer requires income to be credited directly through a bank account. Since it is received in cash, we cannot proceed today. Thank you for choosing Home Credit!")
    ],
    "scenario_4_missing_documents_disqualification": [
        ("agent", "Hello, am I speaking with Priya Nair?"),
        ("customer", "Yes, this is Priya."),
        ("agent", "Do you have two minutes to speak regarding a special Loan Against Property offer of up to 75 lakhs?"),
        ("customer", "Yes, tell me."),
        ("agent", "What type of property do you have?"),
        ("customer", "It's a commercial office, solely owned by me."),
        ("agent", "Do you have the original property documents available for verification?"),
        ("customer", "Actually no, I only have photocopies right now. The original documents are misplaced."),
        ("agent", "Thank you for clarifying. For this pre-approved offer, having original property documents available is a mandatory requirement. As they are unavailable, we won't be able to proceed at this time. Thank you for your time!")
    ],
    "scenario_7_loan_ceiling_negotiation": [
        ("agent", "Hello, am I speaking with Kunal Mehta?"),
        ("customer", "Yes, Kunal speaking."),
        ("agent", "Do you have two minutes to speak regarding your pre-approved Loan Against Property offer?"),
        ("customer", "Yes, go ahead."),
        ("agent", "What type of property do you have?"),
        ("customer", "It's an industrial godown, solely owned, with original documents available."),
        ("agent", "How much loan amount are you looking to borrow?"),
        ("customer", "I have major expansion plans, so I need 90 lakhs."),
        ("agent", "Our current pre-approved offer has a maximum limit of 75 lakhs. Would you like to proceed with the maximum allowed amount of 75 lakhs?"),
        ("customer", "Yes, 75 lakhs works fine for me as well."),
        ("agent", "Great! Are you salaried or self-employed, and is your income in bank or cash?"),
        ("customer", "Self-employed, and all revenue is credited to my current bank account."),
        ("agent", "What is the approximate market value of the property?"),
        ("customer", "Around 1.8 crore."),
        ("agent", "And how many years would you prefer to repay the loan?"),
        ("customer", "12 years."),
        ("agent", "Congratulations, Kunal! You meet the initial criteria for our pre-approved Loan Against Property. A senior loan expert from Home Credit will call you back shortly to provide your exact interest rate. Have a wonderful day!")
    ],
    "scenario_9_existing_loan_transfer": [
        ("agent", "Hello, am I speaking with Sneha Iyer?"),
        ("customer", "Yes, Sneha speaking."),
        ("agent", "As one of our valued customers, you have been selected for a pre-approved Loan Against Property offer of up to 75 lakhs. May we check your eligibility?"),
        ("customer", "Actually, I already have an ongoing home loan running on this property with another bank."),
        ("agent", "Thank you for sharing that. Since you already have an existing loan on the property, this will be handled directly by our Loan Transfer Specialist. A specialist will contact you shortly to assist you. Thank you for your time with Home Credit!")
    ],
    "scenario_11_busy_customer_callback": [
        ("agent", "Hello, am I speaking with Sunita Rao?"),
        ("customer", "Yes, but I am heading into an urgent client meeting right now."),
        ("agent", "I completely understand. What would be a convenient time for us to call you back?"),
        ("customer", "Please call me tomorrow at 4 PM."),
        ("agent", "Thank you, Sunita. We will connect with you then. Have a wonderful day!")
    ],
    "scenario_12_out_of_order_extraction": [
        ("agent", "Hello, am I speaking with Deepak Joshi?"),
        ("customer", "Yes, speaking."),
        ("agent", "Do you have two minutes to check eligibility for our pre-approved Loan Against Property offer?"),
        ("customer", "Yes. I have a commercial shop worth 1.5 crore, jointly owned with my brother, but what interest rate do you offer?"),
        ("agent", "Our exact interest rates are tailored based on property valuation, and our senior loan expert will share the exact figures with you. May I know if you have the original property documents available for verification?"),
        ("customer", "Yes, the original registry papers are at home."),
        ("agent", "Perfect. How much loan amount are you looking to borrow?"),
        ("customer", "I need 60 lakhs."),
        ("agent", "Are you salaried or self-employed, and is your monthly income received via bank transfer or cash?"),
        ("customer", "Self-employed with bank income."),
        ("agent", "And how many years would you prefer to repay the loan?"),
        ("customer", "8 years."),
        ("agent", "Congratulations, Deepak! You meet the initial criteria. A senior loan expert from Home Credit will call you back shortly to provide your exact interest rate. Have a great day!")
    ]
}

def generate_audio():
    print("=" * 80)
    print("GENERATING AUDIO TEST SCENARIOS VIA WINDOWS SPEECH SYNTHESIS")
    print("=" * 80)

    for sc_name, turns in SCENARIOS.items():
        out_path = os.path.abspath(f"audio/{sc_name}.wav")
        # Build powershell command using PromptBuilder
        ps_lines = [
            "Add-Type -AssemblyName System.Speech;",
            "$prompt = New-Object System.Speech.Synthesis.PromptBuilder;",
            "$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer;",
            "$voices = @($synth.GetInstalledVoices() | ForEach-Object { $_.VoiceInfo.Name });",
            "$agentVoice = if ($voices -contains 'Microsoft Heera') { 'Microsoft Heera' } else { 'Microsoft Zira Desktop' };",
            "$custVoice = if ($voices -contains 'Microsoft Ravi') { 'Microsoft Ravi' } else { 'Microsoft David Desktop' };"
        ]
        
        for speaker, text in turns:
            clean_text = text.replace("'", "''").replace('"', '`"')
            v_var = "$agentVoice" if speaker == "agent" else "$custVoice"
            ps_lines.append(f"$prompt.StartParagraph(); $prompt.StartVoice({v_var}); $prompt.AppendText('{clean_text}'); $prompt.EndVoice(); $prompt.EndParagraph(); $prompt.AppendBreak([TimeSpan]::FromMilliseconds(400));")

        ps_lines.append(f"$synth.SetOutputToWaveFile('{out_path.replace(chr(92), '/')}');")
        ps_lines.append("$synth.Speak($prompt);")
        ps_lines.append("$synth.Dispose();")

        cmd = " ".join(ps_lines)
        res = subprocess.run(["powershell", "-Command", cmd], capture_output=True, text=True)
        if res.returncode == 0 and os.path.exists(out_path):
            size_kb = os.path.getsize(out_path) / 1024
            print(f"Generated: audio/{sc_name}.wav ({size_kb:.1f} KB) [OK]")
        else:
            print(f"Failed {sc_name}: {res.stderr}")

    print("=" * 80)
    print("Audio generation complete! All audio files saved in ./audio/")

if __name__ == "__main__":
    generate_audio()

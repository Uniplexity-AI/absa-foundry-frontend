import os

faqs = [
    ("How do I check my account balance?", "You can check your account balance by logging into the ABSA Mobile App, using Internet Banking, or dialing our USSD service code."),
    ("How do I reset my mobile banking PIN?", "To reset your PIN, open the ABSA Mobile App, select 'Forgot PIN' on the login screen, and follow the prompts using your ID and card details."),
    ("What should I do if I lose my debit card?", "If your card is lost or stolen, immediately block it via the ABSA Mobile App under 'Manage Cards' or call our 24/7 hotline to prevent unauthorized transactions."),
    ("How long does a cross-border transfer take?", "International transfers (SWIFT) typically take 2 to 3 business days to reflect in the beneficiary's account, depending on the destination country."),
    ("Can I open a savings account online?", "Yes, you can open an ABSA savings account directly through our website or mobile app without needing to visit a branch."),
    ("What are the daily transaction limits on my card?", "Default daily limits vary by account type. You can view and adjust your specific ATM, POS, and online limits in the ABSA Mobile App."),
    ("How do I block or freeze my account?", "If you suspect fraud, call our emergency hotline immediately or use the 'Freeze Account' option in your ABSA Internet Banking portal."),
    ("How do I update my registered mobile number?", "For security reasons, you must visit your nearest ABSA branch with your ID to update your registered mobile number."),
    ("How do I dispute a fraudulent transaction?", "Please download the Dispute Form from our website, fill it out, and email it to disputes@absa.africa, or visit a branch within 30 days of the transaction."),
    ("Are there monthly maintenance fees for the current account?", "Yes, standard current accounts carry a monthly maintenance fee. Please refer to our latest pricing guide on the ABSA website for exact amounts."),
    ("How do I apply for a personal loan?", "You can apply for a personal loan via Internet Banking, the ABSA Mobile app (if pre-approved), or by speaking to a consultant in-branch."),
    ("How do I register for Absa Internet Banking?", "Go to the ABSA website, click on 'Log In', select 'Register', and use your ATM card number and PIN to create your online profile."),
    ("Can I use my Absa card internationally?", "Yes, your ABSA Visa/Mastercard is accepted globally. However, please notify us via the app before traveling to prevent your card from being flagged for suspicious activity."),
    ("What is the Swift Code for Absa?", "The Swift Code depends on your specific country branch. Please check the 'Bank Details' section on your account statement or our official website."),
    ("How do I request a new chequebook?", "You can order a new chequebook through Internet Banking under the 'Service Requests' tab, and it will be delivered to your chosen branch."),
    ("How do I pay my utility bills using the mobile app?", "Log into the ABSA Mobile App, go to 'Pay & Transfer', select 'Pay Bill', choose your utility provider, and enter your account number and amount."),
    ("Why is my account blocked or suspended?", "Accounts may be suspended due to suspicious activity, outstanding KYC documents, or extended dormancy. Please contact support or visit a branch to resolve this."),
    ("What is the minimum balance required for my account?", "Minimum balance requirements depend on your account tier. Savings accounts usually require a minimal balance, while premium current accounts may differ. Check your account terms."),
    ("How do I download my bank statements?", "Log into ABSA Internet Banking, select your account, click on 'eStatements', choose your date range, and click 'Download PDF'."),
    ("How can I speak to a human agent?", "If I am unable to assist you, simply type 'Agent' or 'Speak to a human', and I will seamlessly transfer this chat to the next available CRM representative.")
]

html_content = """<html>
<head>
<style>
body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
.header { text-align: center; margin-bottom: 30px; }
h1 { color: #DC0037; }
.faq-container { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
.question { font-weight: bold; font-size: 16px; color: #DC0037; }
.answer { margin-top: 5px; font-size: 14px; }
</style>
</head>
<body>
<div class="header">
    <h1>ABSA FAQ Bot Training Data</h1>
    <p>Document Version: 1.0 | Target: Omnichannel NLP Engine</p>
</div>
"""

for q, a in faqs:
    html_content += f'<div class="faq-container"><div class="question">Q: {q}</div><div class="answer">A: {a}</div></div>\n'

html_content += "</body></html>"

target_path = r'c:\Users\ADMIN\Desktop\ABSA_Bot_FAQs.doc'
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Generated successfully at: {target_path}")

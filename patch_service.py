import os

path = r'c:\Users\ADMIN\Desktop\uniplexity-ai\ABSA\absa-foundry-backend\customer-lifecycle-ai\services\prediction-service\app\services\service.py'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Revert portfolio_scores
content = content.replace(
    'bg_preds = bg_pred.predict_batch(features_list)\n        churn_preds = self._churn.predict_batch(features_list)',
    'bg_preds = bg_pred.predict_batch(features_list)'
)
content = content.replace(
    'churn_val = churn_preds[i] if churn_preds else 0.0',
    'churn_val = c90 if c90 is not None else (c30 if c30 is not None else (c14 if c14 is not None else 0.0))'
)

# Update get_prediction and get_churn
new_prediction_logic = '''        t0 = time.perf_counter()
        churn_prob = None
        if self._lifecycle.is_loaded(90):
            lc_res = self._lifecycle.predict_batch([customer_features], 90)
            if lc_res:
                churn_prob = lc_res[0]["probabilities"].get("CHURNED")
        if churn_prob is None:
            churn_prob = self._churn.predict(customer_features)'''

old_prediction_logic = '''        t0 = time.perf_counter()
        churn_prob = self._churn.predict(customer_features)'''

content = content.replace(old_prediction_logic, new_prediction_logic)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated service.py")

The Frontend Devs 
1. Read through codes 
2. Reduce code in one file 
3. Adding statemangement on all buttons 
4. Testin the full app


$body = @{
    username = "admiyn"
    password = "Admin123!"
} | ConvertTo-Json

Invoke-RestMethod `
    -Uri "http://100.82.12.85:8080/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
# 🔑 Настройка GitHub Secrets для деплоя

## Пошаговая инструкция

### 1. Откройте настройки GitHub репозитория
- Перейдите в репозиторий https://github.com/Logan5064/teleshop
- Нажмите **Settings** (вверху)
- Слева выберите **Secrets and variables** → **Actions**

### 2. Добавьте следующие секреты

**Нажмите "New repository secret" для каждого:**

#### HOST
- **Name:** `HOST`
- **Value:** `178.236.17.95`

#### USERNAME  
- **Name:** `USERNAME`
- **Value:** `root`

#### PORT
- **Name:** `PORT` 
- **Value:** `22`

#### SSH_KEY
- **Name:** `SSH_KEY`
- **Value:** (скопируйте ВЕСЬ приватный ключ включая заголовки)
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACArTQzVeEVa3pah9rXlRTRsJZKzpSOPqsMFZZEwoXhWQAAAAJh44XEseOFx
LAAAAAtzc2gtZWQyNTUxOQAAACArTQzVeEVa3pah9rXlRTRsJZKzpSOPqsMFZZEwoXhWQA
AAAEAO3HUCNA09y7bLsmKlmhDLVnO7zDgoCVbZhSkBXHBS8StNDNV4RVrelqH2teVFNGwl
krOlI4+qwwVlkTCheFZAAAAAE2d0eEBERVNLVE9QLTJCVExWNUQBAg==
-----END OPENSSH PRIVATE KEY-----
```

### 3. Добавьте публичный ключ на сервер

**Подключитесь к серверу:**
```bash
ssh root@178.236.17.95
```

**Добавьте ключ:**
```bash
mkdir -p ~/.ssh
echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICtNDNV4RVrelqH2teVFNGwlkrOlI4+qwwVlkTCheFZA gtx@DESKTOP-2BTLV5D" >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### 4. Проверьте настройки

После добавления всех секретов должно быть:
- ✅ HOST: `178.236.17.95`
- ✅ USERNAME: `root`  
- ✅ PORT: `22`
- ✅ SSH_KEY: `-----BEGIN OPENSSH PRIVATE KEY----- ...`

### 5. Тестирование

Запустите локальный тест:
```powershell
.\test-ssh-connection.ps1
```

Если SSH работает, запустите GitHub Action:
- Перейдите в **Actions** → **Deploy TeleShop Constructor to Server**
- Нажмите **Run workflow**

## 🔧 Решение проблем

### Если SSH не работает:
1. Проверьте, что публичный ключ точно добавлен на сервер
2. Проверьте права доступа: `chmod 600 ~/.ssh/authorized_keys`
3. Проверьте, что приватный ключ точно скопирован в GitHub Secrets

### Если GitHub Action не работает:
1. Проверьте логи в разделе Actions
2. Убедитесь, что все 4 секрета добавлены
3. Проверьте, что в SSH_KEY нет лишних пробелов или символов 
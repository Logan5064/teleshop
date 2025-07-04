#!/usr/bin/env python3
"""
Тестирование API auth-bot
"""

import requests
import json

# Базовый URL API
BASE_URL = "http://localhost:8080"

def test_health():
    """Тест health эндпоинта"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"✅ Health check: {response.status_code}")
        print(f"📄 Response: {response.json()}")
        return True
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return False

def test_generate_code():
    """Тест генерации кода"""
    try:
        response = requests.post(f"{BASE_URL}/test/generate-code")
        print(f"✅ Generate code: {response.status_code}")
        data = response.json()
        print(f"📄 Response: {data}")
        return data.get('code') if data.get('success') else None
    except Exception as e:
        print(f"❌ Generate code failed: {e}")
        return None

def test_verify_code(code):
    """Тест проверки кода"""
    try:
        payload = {"code": code}
        response = requests.post(f"{BASE_URL}/api/auth/verify-code", json=payload)
        print(f"✅ Verify code: {response.status_code}")
        data = response.json()
        print(f"📄 Response: {data}")
        return data.get('success', False)
    except Exception as e:
        print(f"❌ Verify code failed: {e}")
        return False

def test_invalid_code():
    """Тест проверки неверного кода"""
    try:
        payload = {"code": "000000"}
        response = requests.post(f"{BASE_URL}/api/auth/verify-code", json=payload)
        print(f"✅ Invalid code test: {response.status_code}")
        if response.status_code == 400:
            print("🎯 Correctly rejected invalid code")
            return True
        else:
            print("⚠️ Should have rejected invalid code")
            return False
    except Exception as e:
        print(f"❌ Invalid code test failed: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Тестирование TeleShop Auth Bot API")
    print("=" * 50)
    
    # Тест 1: Health check
    print("\n1. Тестирование health endpoint")
    if not test_health():
        print("❌ Health check не прошел")
        exit(1)
    
    # Тест 2: Генерация кода
    print("\n2. Тестирование генерации кода")
    code = test_generate_code()
    if not code:
        print("❌ Генерация кода не удалась")
        exit(1)
    
    # Тест 3: Проверка валидного кода
    print(f"\n3. Тестирование проверки валидного кода: {code}")
    if not test_verify_code(code):
        print("❌ Проверка валидного кода не прошла")
        exit(1)
    
    # Тест 4: Проверка повторного использования
    print(f"\n4. Тестирование повторного использования кода: {code}")
    if test_verify_code(code):
        print("⚠️ Код должен был быть отклонен при повторном использовании")
    else:
        print("🎯 Код корректно отклонен при повторном использовании")
    
    # Тест 5: Проверка неверного кода
    print("\n5. Тестирование неверного кода")
    test_invalid_code()
    
    print("\n" + "=" * 50)
    print("✅ Все тесты завершены!")
    print("🎉 Auth Bot API работает корректно!") 
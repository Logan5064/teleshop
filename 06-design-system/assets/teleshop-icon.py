#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Генератор иконки для TeleShop Constructor
Создает профессиональную иконку для GUI приложения
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_teleshop_icon():
    """Создание иконки TeleShop Constructor"""
    
    # Размеры иконки
    sizes = [16, 32, 48, 64, 128, 256]
    
    for size in sizes:
        # Создаем изображение
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # Цвета TeleShop
        bg_color = (59, 130, 246)  # Синий
        accent_color = (147, 51, 234)  # Фиолетовый
        white = (255, 255, 255)
        
        # Основной круг
        margin = max(2, size // 16)
        circle_size = size - margin * 2
        draw.ellipse([margin, margin, margin + circle_size, margin + circle_size], 
                    fill=bg_color, outline=accent_color, width=max(1, size // 32))
        
        # Внутренний дизайн
        center = size // 2
        
        if size >= 32:
            # Символ "T" для TeleShop
            font_size = max(size // 3, 8)
            try:
                font = ImageFont.truetype("arial.ttf", font_size)
            except:
                font = ImageFont.load_default()
            
            # Рисуем "T"
            text = "T"
            bbox = draw.textbbox((0, 0), text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            
            text_x = center - text_width // 2
            text_y = center - text_height // 2
            
            draw.text((text_x, text_y), text, fill=white, font=font)
            
        else:
            # Для маленьких размеров - простая точка
            dot_size = max(size // 4, 2)
            draw.ellipse([center - dot_size, center - dot_size, 
                         center + dot_size, center + dot_size], fill=white)
        
        # Градиентный эффект (простая имитация)
        if size >= 64:
            overlay = Image.new('RGBA', (size, size), (0, 0, 0, 0))
            overlay_draw = ImageDraw.Draw(overlay)
            
            # Блик сверху
            highlight_size = size // 3
            overlay_draw.ellipse([size // 4, size // 6, 
                                size // 4 + highlight_size, size // 6 + highlight_size], 
                               fill=(255, 255, 255, 40))
            
            img = Image.alpha_composite(img, overlay)
        
        # Сохраняем
        filename = f"teleshop-icon-{size}x{size}.png"
        img.save(filename, "PNG")
        print(f"✅ Создана иконка: {filename}")
    
    # Создаем ICO файл
    create_ico_file()
    
    print("🎨 Все иконки созданы!")

def create_ico_file():
    """Создание .ico файла для Windows"""
    try:
        # Загружаем PNG файлы разных размеров
        images = []
        for size in [16, 32, 48, 64]:
            filename = f"teleshop-icon-{size}x{size}.png"
            if os.path.exists(filename):
                images.append(Image.open(filename))
        
        if images:
            # Сохраняем как ICO
            images[0].save("teleshop-constructor.ico", format='ICO', 
                          sizes=[(img.width, img.height) for img in images])
            print("✅ Создан ICO файл: teleshop-constructor.ico")
            
            # Очищаем временные PNG файлы
            for size in [16, 32, 48, 64, 128, 256]:
                filename = f"teleshop-icon-{size}x{size}.png"
                if os.path.exists(filename):
                    os.remove(filename)
                    
    except Exception as e:
        print(f"❌ Ошибка создания ICO: {e}")

if __name__ == "__main__":
    create_teleshop_icon() 
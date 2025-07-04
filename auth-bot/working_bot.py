#!/usr/bin/env python3
import os
import logging
import asyncio
import asyncpg
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BOT_TOKEN = "7503005367:AAF2rrpRUr0TXSKWJZsnlPwtuU-RidYLYos"
WEB_APP_URL = "http://77.73.232.46:3000"

DB_CONFIG = {
    'host': 'ladixoofilad.beget.app',
    'port': 5432,
    'database': 'default_db', 
    'user': 'cloud_user',
    'password': 'u61e&ke&!Ty1'
}

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.effective_user
    logger.info(f"User {user.first_name} ({user.id}) started bot")
    
    keyboard = [[InlineKeyboardButton("🚀 Open TeleShop Admin", url=WEB_APP_URL)]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    welcome_text = f"🎉 Welcome to TeleShop, {user.first_name}!\n\nClick button to access admin panel:"
    
    await update.message.reply_text(welcome_text, reply_markup=reply_markup)

def main():
    logger.info("🤖 Starting TeleShop Auth Bot")
    
    application = Application.builder().token(BOT_TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    
    logger.info("✅ Bot started successfully!")
    application.run_polling()

if __name__ == '__main__':
    main() 
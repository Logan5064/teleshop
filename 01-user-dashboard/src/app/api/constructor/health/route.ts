import { NextResponse } from 'next/server'

/**
 * 🏥 Constructor Mock API Health Check
 */

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "Constructor Mock API",
    port: 3000,
    api_type: "mock",
    message: "Временный Mock API для тестирования"
  })
} 
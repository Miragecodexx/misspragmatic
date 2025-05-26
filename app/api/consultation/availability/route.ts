import { NextResponse } from 'next/server'
import { getAvailableSlots } from '@/utils/calendar'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const startDate = searchParams.get('startDate')
    const days = searchParams.get('days')

    if (!startDate) {
      return NextResponse.json(
        { error: 'Start date is required' },
        { status: 400 }
      )
    }

    const result = await getAvailableSlots(
      new Date(startDate),
      days ? parseInt(days) : undefined
    )

    if (!result.success) {
      throw new Error('Failed to get available slots')
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Availability check error:', error)
    return NextResponse.json(
      { error: 'Failed to get available slots' },
      { status: 500 }
    )
  }
} 
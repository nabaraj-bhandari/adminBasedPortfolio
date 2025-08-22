import { NextRequest, NextResponse } from 'next/server';

export function withErrorHandler(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error) {
      console.error('API Error:', error);
      
      // Return appropriate error response
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  };
}

export function withValidation<T>(
  schema: { parse: (data: unknown) => T },
  handler: (req: NextRequest, validData: T) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      const body = await req.json();
      const validData = schema.parse(body);
      return await handler(req, validData);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }
  };
}

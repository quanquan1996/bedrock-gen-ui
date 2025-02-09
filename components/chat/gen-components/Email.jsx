import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"

export default function Email({ to, from, subject, html }) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className='p-3'>
        <CardTitle className="text-xl font-bold">{subject}</CardTitle>
        <div className="text-sm text-muted-foreground">
          <p><strong>From:</strong> {from}</p>
          <p><strong>To:</strong> {to}</p>
        </div>
      </CardHeader>
      <CardContent className='p-3'>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="prose prose-sm max-w-none"
        />
      </CardContent>
    </Card>
  );
}

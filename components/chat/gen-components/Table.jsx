import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function TableComponent({ headers, rows }) {
  return (
    <div className='rounded-md border'>
      <Table>
        {/* <TableCaption>Caption not implemented</TableCaption> */}
        <TableHeader>
          <TableRow>
            {headers.map(header => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {row.map((cell, idx) => (
                <TableCell key={idx}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@frontend/shared/components/ui/table';
import { Badge } from '@frontend/shared/components/ui/badge';
import statusHistoryService from './status-history.service';
import LoadingOverlay from '../../core/loader';

export function StatusDataTable() {
  const { getState } = statusHistoryService;
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Create Date</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="relative">
          {getState().loading && <LoadingOverlay />}
          {getState().statuses.map((status, index) => (
            <TableRow key={status.id} className="h-12">
              <TableCell>
                <Badge
                  variant={status.type === 'backup' ? 'default' : 'secondary'}
                >
                  {status.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    status.status === 'failed' ? 'destructive' : 'success'
                  }
                >
                  {status?.status}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(status.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>{status?.detail}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

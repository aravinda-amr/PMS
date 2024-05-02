import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';

const CouponTable = ({ coupons, onDeleteCoupon, onEditCoupon, isLoading }) => {
 if (isLoading) {
    return <Typography variant="body1">Loading...</Typography>;
 }
 return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead className="bg-dark-blue text-white">
          <TableRow>
            <TableCell sx={{ color: 'white' }}></TableCell>
            <TableCell sx={{ color: 'white' }}>Discount</TableCell>
            <TableCell sx={{ color: 'white' }}>Expire Date</TableCell>
            <TableCell sx={{ color: 'white' }}>Status</TableCell>
            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coupons.map((coupon) => (
            <TableRow key={coupon._id}>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem', color: 'text.secondary' }}>{coupon.accessNumber}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>{coupon.discount}%</TableCell>
              <TableCell sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>{format(new Date(coupon.expire), 'MM/dd/yyyy')}</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem', color: coupon.status === 'Used' ? 'error.main' : coupon.status === 'Expired' ? 'warning.main' : 'success.main' }}>{coupon.status}</TableCell>
              <TableCell>
                <IconButton onClick={() => onDeleteCoupon(coupon._id)}>
                 <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => onEditCoupon(coupon._id)}>
                 <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {coupons.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body1">No coupons available</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
 );
};

export default CouponTable;

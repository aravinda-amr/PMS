import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { format, addWeeks, addDays } from 'date-fns';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const generateCouponCode = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


const AddCouponForm = ({ id, onCouponAdded, coupon, isEditing, onFormSubmit, onClose }) => {
  const [expire, setExpire] = useState('');
  const [discount, setDiscount] = useState(1);
  const [status, setStatus] = useState('Active');
  const [couponCode, setCouponCode] = useState('');
  const [expiryDifference, setExpiryDifference] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const minDate = format(addDays(new Date(), 1), 'yyyy-MM-dd');

  useEffect(() => {
    if (coupon) {
      setExpire(format(new Date(coupon.expire), 'yyyy-MM-dd'));
      setDiscount(coupon.discount);
      setStatus(coupon.status);
      setCouponCode(coupon.couponCode);
    } else {
      const twoWeeksFromToday = addWeeks(new Date(), 2);
      setExpire(format(twoWeeksFromToday, 'yyyy-MM-dd'));
      setDiscount(1);
      setStatus('Active');
      setCouponCode(generateCouponCode());
    }
  }, [coupon]);

  useEffect(() => {
    if (expire) {
      const expiryDate = new Date(expire);
      const now = new Date();
      const daysDifference = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));

      let differenceText = '';
      if (daysDifference > 0) {
        differenceText = `${daysDifference} day(s) from now`;
      } else {
        differenceText = 'Expired';
      }

      setExpiryDifference(differenceText);
    }
  }, [expire]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const couponData = { expire, discount, status, couponCode };

      let response;
      if (isEditing) {
        response = await fetch(`/api/user/${id}/coupons/${coupon._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(couponData),
        });
      } else {
        response = await fetch(`/api/user/${id}/coupons`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(couponData),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to update coupon');
      }

      setExpire('');
      setDiscount(1);
      setStatus('Active');

      if (onCouponAdded) {
        onCouponAdded();
      }

      if (onClose) {
        onClose();
      }

      if (onFormSubmit) {
        onFormSubmit();
      }
    } catch (error) {
      setError('Error updating coupon');
      console.error('Error updating coupon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-light-blue p-8 rounded-xl w-96 relative shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-dark-blue">{isEditing ? "Update Coupon" : "Add Coupon"}</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Expiry"
            type="date"
            value={expire}
            onChange={(e) => setExpire(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: minDate,
            }}
            required
            fullWidth
            margin="normal"
          />
          <p className="text-xs text-gray-400">{expiryDifference}</p>
          <TextField
            label="Discount"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            required
            InputProps={{
              inputProps: {
                min: 1,
                max: 100,
              },
            }}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <div className="relative border-none">
              <InputLabel className="appearance-none">Status</InputLabel>
            </div>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Used">Used</MenuItem>
              <MenuItem value="Expired">Expired</MenuItem>
            </Select>
          </FormControl>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {loading ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="flex justify-between">
              <Button type="submit" variant="contained" color="primary">{isEditing ? "Update" : "Add"}</Button>
              <Button type="button" onClick={handleCancel} variant="outlined" color="primary">Cancel</Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddCouponForm;

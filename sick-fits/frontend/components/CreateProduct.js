import { useState } from 'react';
import useForm from '../lib/useForm';

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Nice Shoes',
    price: 3242,
    description: 'Cool shoes. Red nike running shoes',
  });
  return (
    <form>
      <label htmlFor='name'>
        Name
        <input
          type='text'
          id='name'
          name='name'
          placeholder='name'
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor='price'>
        Price
        <input
          type='number'
          id='price'
          name='price'
          placeholder='price'
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
      <button type='button' onClick={clearForm}>
        Clear Form
      </button>
      <button type='button' onClick={resetForm}>
        Reset Form
      </button>
    </form>
  );
}

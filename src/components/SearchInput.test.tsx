import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchInput from './SearchField';

describe('SearchInput component', () => {
 
  it('calls onChange function when text is entered', () => {
    const onChangeMock = vi.fn();
    render(<SearchInput placeholder="Search" search="" onChange={onChangeMock} />);

    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

});

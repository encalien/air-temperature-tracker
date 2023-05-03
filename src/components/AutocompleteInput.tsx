import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import UtilsService from '../services/UtilsService';

export default function AutocompleteInput(
  { inputName, onSuggestionSelect, autocompleteText }: { inputName: string, onSuggestionSelect: Function, autocompleteText: Function }
) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const startAutocomplete = (value: string) => {
    autocompleteText(value)
      .then((suggestions: string[]) => {
        setSuggestions(suggestions);
      })
      .catch((error: any) => {
        toast(error);
      });
  }

  const debouncedStartAutocomplete = useCallback(
    UtilsService.debounce((value: string) => startAutocomplete(value), 2000),
    []
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) {
      setInputValue('');
      setSuggestions([]);
      return;
    }
    
    const capitalizedValue = value[0].toUpperCase() + value.slice(1);
    setInputValue(capitalizedValue);

    debouncedStartAutocomplete(capitalizedValue);
  }

  const handleSelect = useCallback(
    (suggestion: string) => {
      setInputValue(suggestion);
      setSuggestions([]);
      onSuggestionSelect(suggestion);
    },
    [onSuggestionSelect]
  );

  return (
    <div className="flex-item form-group">
      <input required type="text" id={inputName} name={inputName} value={inputValue} autoComplete="off" onChange={handleChange} />
      {!!suggestions.length && <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion} onClick={() => handleSelect(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>}
    </div>
  );
};
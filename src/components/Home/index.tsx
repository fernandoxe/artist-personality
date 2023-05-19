'use client';
import { FormEvent, useState } from 'react';
import { ChipList } from '../ChipList';
import { Autocomplete } from '../Autcomplete';
import { albums } from '../../data'

const data = albums.map((album: any) => album.tracks).flat();

export const Home = () => {
  const [items, setItems] = useState<string[]>(data);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const [error, setError] = useState('');

  const handleSelect = (item: string) => {
    const newItems = items.filter((i) => i !== item);
    setItems(newItems);
    setSelectedItems([...selectedItems, item]);
  };

  const handleDelete = (item: string) => {
    const newItems = [...items, item];
    setItems(newItems);
    const newSelectedItems = selectedItems.filter((i) => i !== item);
    setSelectedItems(newSelectedItems);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if(selectedItems.length < 4) {
      return;
    }

    setError('');
    setLoading(true);
    setMessage('');
    setDisabled(true);
    try {
      const response = await fetch('/api', {method: 'POST', body: JSON.stringify({songs: selectedItems})});
      const data = await response.json();
      setMessage(data.personality);
    } catch (error: any) {
      console.log('error', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center gap-4">
      <h1 className="text-[#2f1233] text-xl font-bold text-center">
        Tu personalidad según estas canciones
      </h1>
      {!disabled &&
        <Autocomplete
          data={items}
          onSelect={handleSelect}
          disabled={selectedItems.length >= 8}
        />
      }
      {selectedItems.length > 0 &&
        <ChipList
          items={selectedItems}
          onDelete={handleDelete}
          disabled={disabled}
        />
      }
      {!message &&
        <form className="flex justify-center" onSubmit={handleSubmit}>
          <div className="relative">
            <button
              className={`px-4 py-2 bg-[#0f1d28] rounded-md text-[#ac9eb8] font-medium outline-none shadow-sm shadow-black disabled:shadow-none`}
              disabled={selectedItems.length < 4 || loading}
            >
              {loading &&
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 rounded-full border-2 border-[#ac9eb8] border-t-transparent"></div>
                </div>
              }
              <div className={`${loading ? 'invisible' : ''}`}>
                ACEPTAR
              </div>
            </button>
          </div>
        </form>
      }
      {error &&
        <>
          <div className="text-xs text-[#2f1233] text-center">Hubo un error, intenta de nuevo</div>
        </>

      }
      {message && <div className="text-[#2f1233]">{message}</div>}
    </div>
  );
};

import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { supabase } from '../../lib/supabase';

interface DocumentUploadProps {
  documentType: string;
  onUploadComplete: (documentId: string) => void;
}

export function DocumentUpload({ documentType, onUploadComplete }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'complete' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setStatus('uploading');

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${documentType}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create document record
      const { data, error: dbError } = await supabase
        .from('documents')
        .insert({
          document_type: documentType,
          file_path: filePath,
          ocr_status: 'pending'
        })
        .select()
        .single();

      if (dbError) throw dbError;

      setStatus('complete');
      if (data) onUploadComplete(data.id);
    } catch (error) {
      console.error('Upload error:', error);
      setStatus('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 border-2 border-dashed rounded-lg border-gray-300 hover:border-primary-500 transition-colors">
      <div className="space-y-4">
        <div className="flex justify-center">
          {status === 'complete' ? (
            <CheckCircle className="w-12 h-12 text-green-500" />
          ) : status === 'error' ? (
            <AlertCircle className="w-12 h-12 text-red-500" />
          ) : (
            <Upload className="w-12 h-12 text-gray-400" />
          )}
        </div>
        
        <div className="text-center">
          <label className="block text-sm font-medium text-gray-700">
            {documentType} Document
          </label>
          <div className="mt-1">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="sr-only"
              id={`file-upload-${documentType}`}
            />
            <label
              htmlFor={`file-upload-${documentType}`}
              className="cursor-pointer text-primary-500 hover:text-primary-600"
            >
              Choose a file
            </label>
            {file && (
              <p className="mt-2 text-sm text-gray-500">
                Selected: {file.name}
              </p>
            )}
          </div>
        </div>

        {file && (
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full"
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        )}

        {status === 'processing' && (
          <p className="text-sm text-center text-gray-500">
            Processing document...
          </p>
        )}
      </div>
    </div>
  );
}
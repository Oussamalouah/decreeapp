import React, {useRef} from 'react';
import {DecreeText} from '../../../../core/DecreeText';
import {UploadIcon} from '../../../../../assets/svg';
import {toast} from 'react-toastify';
import clsx from 'clsx';

type Props = {
  title?: string;
  isLoading?: boolean;
  hasLogoUploaded?: boolean;
  onFileUpload: (uploadedLogo: string) => void;
  userClickedDeleteLogo: () => void;
};

export const UploadSection = (props: Props) => {
  const hiddenFileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col laptop:items-center space-y-[6px]">
      <DecreeText size={16} className="text-gray-medium laptop:text-center">
        {props.title || 'Upload your photo'}
      </DecreeText>
      <div className="space-y-2">
        <button
          type="button"
          disabled={props.isLoading}
          className={clsx([
            'p-6 bg-white max-w-max max-h-max border border-gray-dark rounded',
            {'cursor-not-allowed': props.isLoading},
          ])}
          onClick={() => hiddenFileRef.current?.click()}
        >
          <UploadIcon />
        </button>
        <input
          type="file"
          className="hidden"
          accept=".png, .jpg, .svg"
          ref={hiddenFileRef}
          onChange={e => {
            const file = e.target.files?.[0];

            if (file) {
              const maxFileSize = 10485760; // 10mb

              if (file.size > maxFileSize) {
                toast.error('File is too big!');
                return;
              }

              const reader = new FileReader();

              reader.onload = () => {
                if (typeof reader.result === 'string') {
                  // clear data first has a bug that it doesnt change the state
                  props.onFileUpload('');
                  e.target.value = '';
                  props.onFileUpload(reader.result);
                } else {
                  toast.error('Unable to upload file');
                }
              };

              reader.onerror = () => {
                toast.error('Unable to upload file');
              };

              reader.readAsDataURL(file);
            }
          }}
        />
        <DecreeText
          size={12}
          className={clsx([
            'max-w-max',
            {
              'cursor-not-allowed text-gray-medium':
                props.isLoading || !props.hasLogoUploaded,
            },
            {
              'cursor-pointer text-blue-dark': !(
                props.isLoading || !props.hasLogoUploaded
              ),
            },
          ])}
          onClick={() => {
            if (!props.isLoading && props.hasLogoUploaded) {
              props.userClickedDeleteLogo();
            }
          }}
        >
          Delete
        </DecreeText>
      </div>
    </div>
  );
};

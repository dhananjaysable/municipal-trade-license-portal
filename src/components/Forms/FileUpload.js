import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  LinearProgress,
  Alert
} from '@mui/material';
import { CloudUpload, Delete, InsertDriveFile } from '@mui/icons-material';
import { uploadFile } from '../../utils/localStorageHelpers';

const FileUpload = ({ onFilesUploaded, existingFiles = [], maxFiles = 5 }) => {
  const [files, setFiles] = useState(existingFiles);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef();

  const handleFileSelect = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    setError('');

    if (files.length + selectedFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate file types and sizes
    const validFiles = [];
    for (const file of selectedFiles) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError(`File ${file.name} is too large. Maximum size is 10MB.`);
        continue;
      }

      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setError(`File ${file.name} has invalid format. Only PDF, JPG, and PNG files are allowed.`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = validFiles.map(file => uploadFile(file));
      const uploadedFiles = await Promise.all(uploadPromises);
      
      const newFiles = [...files, ...uploadedFiles];
      setFiles(newFiles);
      onFilesUploaded(newFiles);
    } catch (err) {
      setError('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesUploaded(newFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    // Create a synthetic event to reuse the existing file handling logic
    const syntheticEvent = {
      target: {
        files: droppedFiles
      }
    };
    handleFileSelect(syntheticEvent);
  };

  return (
    <Box>
      <Card
        sx={{
          border: '2px dashed',
          borderColor: 'primary.main',
          backgroundColor: 'action.hover',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'action.selected'
          }
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Drop files here or click to upload
          </Typography>
          <Typography variant="body2" color="text.secondary">
            PDF, JPG, PNG files up to 10MB each (Max {maxFiles} files)
          </Typography>
          {uploading && (
            <Box sx={{ mt: 2 }}>
              <LinearProgress />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Uploading files...
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <input
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {files.length > 0 && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Uploaded Files ({files.length}/{maxFiles})
            </Typography>
            <List>
              {files.map((file, index) => (
                <ListItem key={index}>
                  <InsertDriveFile sx={{ mr: 2, color: 'primary.main' }} />
                  <ListItemText
                    primary={file.name}
                    secondary={file.size}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default FileUpload;

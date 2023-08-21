import { Grid, Typography, styled, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDropzone, Accept } from "react-dropzone";

const Input = styled("input")({});

type Props = {
  accept?: Accept;
  placeholder?: string;
  multiple?: boolean;
  onChange?: (files: File[]) => void;
};

const Filepicker: React.FCX<Props> = (props) => {
  const { accept, placeholder, multiple, onChange, sx } = props;
  const theme = useTheme();
  const [files, setFiles] = useState<any>([]);
  const ac = accept ?? {
    "text/*": [],
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: ac,
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setFiles(newFiles);
      if (onChange) {
        onChange(newFiles);
      }
    },
    multiple: multiple ?? false, // 複数ファイルの選択
  });
  useEffect(() => {
    return () => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  return (
    <Grid
      container
      {...getRootProps({ className: "dropzone" })}
      sx={{
        ...sx,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px dashed #eeeeee",
        backgroundColor: "#fafafa",
        padding: theme.spacing(2),
        height: "100%",
        cursor: "pointer",
      }}
    >
      <Input {...getInputProps()} />
      <Typography
        sx={{
          color: "#bdbdbd",
        }}
      >
        {placeholder ?? "Drag 'n' drop a file here, or click to select a file"}
      </Typography>
    </Grid>
  );
};
export default Filepicker;

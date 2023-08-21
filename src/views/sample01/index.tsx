import { Button, Grid, styled, useTheme } from "@mui/material";
import React from "react";
import Filepicker from "../../components/filepciker";
import { useSample01 } from "./useSample01";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PolylineIcon from "@mui/icons-material/Polyline";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
  InfoButton,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.css";

type Props = {};

const Sample01: React.FCX<Props> = (props) => {
  const theme = useTheme();
  const {
    onFileChangeAsync,
    tokens,
    columns,
    sendEmbeddingAPIAsync,
    chatInput,
    onChangeInput,
    questionAsync,
    chatMessages,
    loadingWithAI,
    vectorStorageExportAsync,
    vectorStorageImportAsync,
  } = useSample01();
  return (
    <Grid container>
      <Grid item xs={6}>
        <Grid container sx={{ padding: theme.spacing(2) }}>
          <Filepicker
            multiple={false}
            accept={{
              "text/plain": [".txt"],
              "application/pdf": [".pdf"],
            }}
            placeholder="テキストファイルをドラック＆ドロップ"
            onChange={async (files) => await onFileChangeAsync(files)}
          />
        </Grid>
        <Grid
          container
          sx={{
            height: "max(365px, calc(100vh - 235px))",
          }}
        >
          <DataGrid
            columns={columns}
            rows={tokens}
            // hideFooter={true}
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container sx={{ padding: theme.spacing(2) }}>
          <MainContainer
            style={{ width: "100%", height: "max(365px, calc(100vh - 160px))" }}
            responsive={true}
          >
            <ChatContainer
              style={{
                height: "100%",
              }}
            >
              <MessageList
                typingIndicator={
                  loadingWithAI && <TypingIndicator content="AIが検索中..." />
                }
              >
                {chatMessages.map((x, i) => {
                  if (!x.payload) {
                    return <Message key={`${i}`} model={x}></Message>;
                  }
                  return (
                    <Message key={`${i}`} model={x}>
                      <Message.CustomContent>
                        <strong>{`${x.payload}`}</strong>
                        <br />
                        <span>{x.message}</span>
                      </Message.CustomContent>
                    </Message>
                  );
                })}
              </MessageList>
              <MessageInput
                attachButton={false}
                value={chatInput}
                disabled={loadingWithAI}
                onChange={(html, textContent, innerText, nodes) =>
                  onChangeInput(innerText)
                }
                onSend={async () => await questionAsync()}
              />
            </ChatContainer>
          </MainContainer>
        </Grid>
      </Grid>
    </Grid>
  );
  function CustomToolbar(props) {
    return (
      <GridToolbarContainer>
        <Grid item sx={{ flex: 1 }}>
          <Button
            startIcon={<PolylineIcon />}
            onClick={async () => await sendEmbeddingAPIAsync()}
            sx={{}}
          >
            ベクトル化
          </Button>
          <Button
            startIcon={<FileDownloadIcon />}
            onClick={async () => await vectorStorageExportAsync()}
          >
            Export
          </Button>
          <Button
            startIcon={<FileUploadIcon />}
            onClick={async () => await vectorStorageImportAsync()}
          >
            Import
          </Button>
        </Grid>
        <Grid item>
          <Button startIcon={<SaveAltIcon />} sx={{}}>
            <a
              href="./public/assets/20191209001-3.pdf"
              download
              style={{ color: "inherit", textDecoration: "none" }}
            >
              SamplePDF Download
            </a>
          </Button>
        </Grid>
      </GridToolbarContainer>
    );
  }
};

export default Sample01;

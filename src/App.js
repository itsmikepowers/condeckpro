import React, { useState } from 'react';
import { Button, Flex, HStack, Heading, VStack, useToast } from '@chakra-ui/react';
import { DownloadIcon, CopyIcon, AddIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { saveAs } from 'file-saver';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchVideo = async () => {
    setLoading(true);
    const url = 'https://tiktok-download-video1.p.rapidapi.com/userPublishVideo?unique_id=%40[YOUR-USERNAME]&count=1';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ADD-YOUR-API-KEY-HERE',
        'X-RapidAPI-Host': 'tiktok-download-video1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const videoData = data?.data?.videos[0];
      if (videoData) {
        setVideoUrl(videoData.play);
        setCaption(videoData.title);
      } else {
        console.error("Video URL or caption not found");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Caption copied!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.blob(); // Get the data as a Blob
      saveAs(data, "downloadedVideo.mp4"); // Use FileSaver to save the file
    } catch (error) {
      console.error("Failed to download the file:", error);
    }
  };

  const navigateToUrl = (url) => {
    window.open(url, '_blank').focus();
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <VStack spacing={4}>
        <Heading>🚀 ConDeck</Heading>
        <Button leftIcon={<AddIcon />} variant="outline" colorScheme="gray" borderWidth="2px" onClick={fetchVideo} isLoading={loading}>
          Fetch TikTok
        </Button>
        {videoUrl && caption && (
          <HStack align="start">
            <video width="320" height="240" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <VStack spacing={4} align="start">
              <Button onClick={() => handleDownload(videoUrl)} leftIcon={<DownloadIcon />} variant="outline" colorScheme="gray" borderWidth="2px">
                Download
              </Button>
              <Button onClick={() => copyToClipboard(caption)} leftIcon={<CopyIcon />} variant="outline" colorScheme="gray" borderWidth="2px">
                Copy Caption
              </Button>
              <Button 
                onClick={() => navigateToUrl('https://www.facebook.com/profile.php?id=100095173182390')} 
                leftIcon={<ExternalLinkIcon />} 
                variant="outline" 
                colorScheme="gray" 
                borderWidth="2px"
                className="linkedin-button" // Custom class for styling
              >
                Facebook
              </Button>
              <Button 
                onClick={() => navigateToUrl('https://studio.youtube.com/channel/UCJJqeW8My07X2r_WXokg-Cw/videos/upload?d=ud&filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D')} 
                leftIcon={<ExternalLinkIcon />} 
                variant="outline" 
                colorScheme="gray" 
                borderWidth="2px"
                className="youtube-button" // Custom class for styling
              >
                YouTube Studio
              </Button>
              <Button 
                onClick={() => navigateToUrl('https://www.instagram.com')} 
                leftIcon={<ExternalLinkIcon />} 
                variant="outline" 
                colorScheme="gray" 
                borderWidth="2px"
                className="instagram-button" // Custom class for styling
              >
                Instagram
              </Button>
              <Button 
                onClick={() => navigateToUrl('https://www.linkedin.com/in/itsmikepowers/overlay/create-post/')} 
                leftIcon={<ExternalLinkIcon />} 
                variant="outline" 
                colorScheme="gray" 
                borderWidth="2px"
                className="linkedin-button" // Custom class for styling
              >
                Linkedin
              </Button>
            </VStack>
          </HStack>
        )}
      </VStack>
    </Flex>
  );
}

export default App;

import React, { useState } from "react";
import 'antd/dist/antd.css';
import './App.css';
import { Row, Col, Form, Icon, PageHeader, Input, Card, List, message, Progress, Drawer } from 'antd';

const About = () => {

  const [state, setState] = useState({ data: [], searchData: [], analyzing: false, imageText: '', uploading: false, pageLoadComplete: false, uploadProgress: 0, progressStatus: '' });
  const [stateDrw, setStateDrw] = useState({ drawerVisible: false, imageUrl: '' });
  const { Search } = Input;

  const ImageGrid = () => {

    if (!state.pageLoadComplete) {
      fetch(
        "http://localhost:5000/imageInfo/",
        {
          method: 'GET'
        }
      )
        .then(async res => await res.json())
        .then((res) => {
          setState({ ...state, searchData: res, data: res, pageLoadComplete: true });
        })
    }

    return (
      <div style={{ padding: '0 20px 0 20px' }}>
        <div style={{ background: '#f6f6f6', padding: '20px', border: '1px dashed #e6e6e6', marginTop: '10px' }}>
          <List
            grid={{
              gutter: 0,
              xs: 1,
              sm: 2,
              md: 8
            }}
            dataSource={state.searchData}
            renderItem={imgItem => (
              <List.Item onClick={() => { setStateDrw({ drawerVisible: true, imageUrl: imgItem.url }) }}>
                <Card hoverable style={{ width: 200 }} cover={<img alt="example" src={imgItem.url} />}></Card>
              </List.Item>
            )}
          />
        </div>
      </div>

    );
  }

  function onClose() {
    setStateDrw({ drawerVisible: false, imageUrl: '' });
  }


  function OCR(imgUrl, publicId, format, secureUrl) {

    fetch(
      "https://mgvision.cognitiveservices.azure.com/vision/v2.0/ocr",
      {
        method: 'POST',
        body: JSON.stringify({ url: imgUrl }),
        headers: {
          "Ocp-Apim-Subscription-Key": "fc1404ca2e2c43ac89073218eb38a44e",
          "Content-Type": "application/json"
        }
      }
    )
      .then(async res => await res.json())
      .then((res) => {

        let imgTxt = '';
        res.regions.map(
          region => (
            region.lines.map(
              line => (
                line.words.map(word => (
                  imgTxt = imgTxt + ' ' + `${word.text}`
                ))
              ))
          ))

        const formData = {
          public_id: publicId,
          format: format,
          url: imgUrl,
          secure_url: secureUrl,
          image_text: imgTxt
        }

        fetch(
          "http://localhost:5000/imageInfo/add",
          {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
          .then(async imgRes => await imgRes.json())
          .then((imgRes) => {
            setState({ ...state, imageText: imgTxt, analyzing: false, pageLoadComplete: false, uploadProgress: 100, progressStatus: '' });
          })

      });


  }

  let fileInputControl, searchInputControl;

  const handleUpload = () => {

    setState({ ...state, loading: true, uploadProgress: 10, progressStatus: 'Uploading' });

    const formData = new FormData();

    formData.append('file', fileInputControl.files[0]);

    const options = {
      method: 'POST',
      body: formData
    };

    fetch('http://localhost:5000/upload/image-upload', options).then(async res => {

      let resJSON = await res.json()

      if (res.ok) {

        let imgUrl = resJSON[0].url;
        let secureUrl = resJSON[0].secure_url;
        let format = resJSON[0].format;
        let publicId = resJSON[0].public_id;

        // console.log(resJSON[0].url);
        setState({ ...state, loading: false, analyzing: true, uploadProgress: 50, progressStatus: 'Analyzing image' });
        OCR(imgUrl, publicId, format, secureUrl);

      }
      else if (res.status === 400) {
        message.error("some error");
      }
      else {
        message.error("some error 2");
      }

    });
  }

  function handleSearch() {
    let updatedList = state.data;
    updatedList = updatedList.filter((item) => {
      return item.image_text.toLowerCase().search(searchInputControl.input.value) !== -1;
    });
    setState({ ...state, searchData: updatedList });
  }

  return (
    <div>
      <PageHeader onBack={() => null} title="Documents" backIcon={false} />
      <div style={{ padding: '0px 20px 0px 20px' }}>
        <div style={{ backgroundColor: '#e6e6e6', padding: '20px 10px 0px 10px' }}>
          <Row>
            <Col span={4} push={20} style={{ paddingRight: `20px` }}>
              {!state.loading && !state.analyzing &&
                <div>
                  <span class="btn btn-primary btn-file">
                    Upload File <input type="file" class="form-control-file" onChange={handleUpload} id="fileInputControl" ref={comp => fileInputControl = comp} />
                  </span>
                </div>
              }
              {(state.loading || state.analyzing) &&
                <div className="spinner">
                  <div><Progress percent={state.uploadProgress} size="small" /></div><span>Uploading</span>
                </div>
              }

            </Col>
            <Col span={20} pull={4} style={{ paddingLeft: `20px`, paddingRight: `20px` }}>
              <Row>
                <Col md={24}>
                  <Form layout="vertical">
                    <Form.Item>
                      <Input prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} allowClear placeholder="input search text" ref={comp => searchInputControl = comp} onChange={handleSearch} className="searchInput" />,
                     </Form.Item>
                  </Form>
                </Col>
              </Row>

            </Col>
          </Row>
        </div>
      </div>
      <ImageGrid></ImageGrid>
      <Drawer title="Image" width="auto" onClose={onClose} visible={stateDrw.drawerVisible}>
        <img src={stateDrw.imageUrl}></img>
      </Drawer>
      <br />
      <br />

      {/* <button onClick={OCR} className="btn btn-outline-success mb-2 mx-sm-2" type="button">Read Image Text</button>      */}
      {/* <div>{JSON.stringify(state.imageText)}</div> */}
      {/* <br />  */}
      {/* {
        state.analysis
        &&
        state.data.regions.map(
          region => (
            region.lines.map(
              line => (
                line.words.map(word => (
                  <div>{word.text}</div>
                ))
              ))
          ))
        }  */}
      {/* <br />  */}
    </div>
  );

};

export default About;

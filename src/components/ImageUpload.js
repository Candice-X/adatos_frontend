import React from "react";
import { Form, Icon, Upload, Button, message } from 'antd';
import {API_ROOT} from "../constants";

const FormItem = Form.Item;

class ImageUploadForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const formData = new FormData();
        formData.append('file', values.files[0].originFileObj);

        fetch(`${API_ROOT}/uploader`, {
          method: 'POST',
          body: formData,
          // mode: "no-cors",
        }).then(
          (response) => {
            message.success('Upload successfully. Waiting for result...');
            this.props.onUploadSuccess(values.files[0].name);
          },
          (error) => {
            message.error('Upload Failed.')
          }).catch((err) => {
          console.log(err);
        });
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    e.fileList = e.fileList.slice(-1);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  beforeUpload = () => {
    return false;
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Image"
        >
          <div className="dropbox">
            {
              getFieldDecorator('files', {
              rules: [{ required: true, message: 'Please select an image.' }],
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              })(<Upload.Dragger name="files" beforeUpload={this.beforeUpload} action={`${API_ROOT}/uploader`}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag tiff image to this area to upload</p>
                <p className="ant-upload-hint">Support for a single upload.</p>
              </Upload.Dragger>)
            }
          </div>
        </FormItem>

        <FormItem
          wrapperCol={{ span: 12, offset: 6}}
        >
          <Button type="primary" htmlType="submit" className="upload-form-button" >Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

export const ImageUpload = Form.create()(ImageUploadForm);

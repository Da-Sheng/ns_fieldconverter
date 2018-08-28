/**
 * Created by zxh on 2016/12/12.
 */
import React from 'react';
import {
  Form,
  Col,
  Input,
  Button,
  DatePicker,
  Select,
  Table,
  Icon,
  Radio,
  InputNumber,
  Checkbox,
  Modal,
  message,
  notification,
  Affix,
  Upload
} from 'antd';

const FormItem = Form.Item;

import Logger from 'ns_logger';


const logger = Logger.getLogger('ImageFileConverter');

class ImageFileConverter {

// options = {
//   obj: InnerTable(this)
//   field: formSchema[key]
//   wrapper: colWrapper
//   getFieldProps: InnerTable(this).getFieldProps  见../../DBTable/index ：401
//   fieldOptions: {
//     rules: field.rules,
//     initialValue: field.initialValue,
//     valuePropName: field.valuePropName
//   }
// }
  convert(option) {
    const {getFieldProps, field, fieldOptions, wrapper, obj} = option;
    switch (field.dataType) {
      case 'imageFile':
        return this.transformImageFile(option);
    }
  }

  /**
    * 将schema中的一列转换为下拉框
    *
    * @param field
    */
  // transformImageFile(option) {
  //   const {getFieldProps, field, fieldOptions, obj, wrapper} = option;
  //   return wrapper((
  //         {...obj.props.form.getFieldDecorator(field.key,fieldOptions)(<Upload action={field.imageFileUpUrl}  onChange={obj.onImageFileChange} fileList={obj.state.fileList}  >
  //           <Button type="ghost">
  //             <Icon type="upload" /> 上传图片
  //           </Button>
  //         </Upload>)}
  //   ), field);
  // }
  beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    const isGIF = file.type === 'image/gif';
    const isBMP = file.type === 'image/bmp';
    if (!isJPG && !isPNG && !isGIF && !isBMP ) {
      notification.error({
        message: '请上传正确的图片文件',
        description: '系统支持jpg、png、gif、bmp，4种文件格式'});
    }
    return isJPG || isPNG || isGIF || isBMP;
  }

// options = {
//   obj: InnerTable(this)
//   field: formSchema[key]
//   wrapper: colWrapper
//   getFieldProps: InnerTable(this).getFieldProps  见../../DBTable/index ：401
//   fieldOptions: {
//     rules: field.rules,
//     initialValue: field.initialValue,
//     valuePropName: field.valuePropName
//   }
// }

  transformImageFile(option) {
      const {getFieldProps, field, fieldOptions, obj, wrapper} = option;
      const { props } = field;
      const imageFileUpUrl = field.imageFileUpUrl;
      const OPTION_IMAGE =0x1;
      const OPTION_SAVE =0x1<<1;
      const OPTION_MD5 =0x1<<2;
      const upOpt = obj.state.upOpt;
      const len = upOpt ? upOpt.length : 0;
      let queryUrl = 0;
      for(let i=0; i < len; i++){
        switch (upOpt[i]) {
          case 'OPTION_SAVE':
            queryUrl = OPTION_SAVE | queryUrl;
            break;
          case 'OPTION_MD5':
            queryUrl = OPTION_MD5 | queryUrl;
            break;
        }
      }
      const url = `${imageFileUpUrl}?requestFlag=${queryUrl}&responseFlag=${obj.responseStatus}`

    // colWrapper(formItem, field) {
    //   return (
    //     <FormItem key={field.key}
    //               className={field.formItemClassName}
    //               label={field.title}
    //               labelCol={field.labelCol != undefined ? field.labelCol : {span: 6}}
    //               wrapperCol={ field.wrapperCol != undefined  ? field.wrapperCol : {span : 18} }>
    //       {formItem}
    //     </FormItem>
    //   );
    // }


// options = {
//   obj: InnerTable(this)
//   field: formSchema[key]
//   wrapper: colWrapper
//   getFieldProps: InnerTable(this).getFieldProps  见../../DBTable/index ：401
//   fieldOptions: {
//     rules: field.rules,
//     initialValue: field.initialValue,
//     valuePropName: field.valuePropName
//   }
// }


      return wrapper(
        ({
          ...obj.props.form.getFieldDecorator(field.key, fieldOptions)

            (<Upload beforeUpload={this.beforeUpload}
                     action={url}
                     onChange={obj.onImageFileChange}
                     fileList={obj.state.fileList}
                     disabled={field.disabled}
                     hdisabled={
                       obj.props.formItemsConfig
                       && obj.props.formItemsConfig[field.key]
                       && obj.props.formItemsConfig[field.key].disabled}
                      {...props}
              >
              <Button type="ghost"
                      disabled={field.disabled}
                      hdisabled={
                        obj.props.formItemsConfig
                        && obj.props.formItemsConfig[field.key]
                        && obj.props.formItemsConfig[field.key].disabled}>
                <Icon type="upload" /> 上传图片
              </Button>
            </Upload>)
        }), field);
    }
}
export default ImageFileConverter;

/**
 * Created by zxh on 2016/12/12.
 */
import React from 'react';
import { Modal } from 'antd';

// import ImageView from '../../components/ImageView';  //查看图片组件
import Logger from 'ns_logger';

//图片的查看详情组件

class ImageView extends React.Component {

  state = {
    imgList: [],  //显示的图片列表
    imageViewVisible: false
  }

  imageView = () => {
    this.setState({ imageViewVisible: true });
    let imgs=this.props.images;
    let imgList;
    if (imgs.length>0) {
          imgList = imgs.map((node) => {
            return (<img src={node} />);
          });
        }
        else{
          imgList="未添加图片";
        }

    this.setState({ imgList: imgList });
  }

  hideModal = () => {
    this.setState({ imageViewVisible: false });
  }

  handleModalOk = () => {
    this.setState({ imageViewVisible: false });
  }

  render() {
    return (
      <div>
        <a href="javascript:void(0)" onClick={this.imageView}>查看图片</a>
        <Modal title="查看图片" visible={this.state.imageViewVisible} onOk={this.handleModalOk}
          onCancel={this.hideModal}>
          {this.state.imgList}
        </Modal>
      </div>
    );
  }
}

const logger = Logger.getLogger('HrefElementConverter');

class HrefElementConverter {

  convert(option) {
    const {getFieldProps, field, fieldOptions, wrapper, obj} = option;
    switch (field.dataType) {
      case 'imageView':
        return this.transformImgView(option);
    }
  }

  /**
    * 将schema中的一列转换为下拉框
    *
    * @param field
    */
  transformImgView(option) {
    const {getFieldProps, field, fieldOptions, obj, wrapper} = option;
    logger.debug('transform field %o to datetime input', field);
    return wrapper((
      <ImageView images={field.images}/>
    ), field);
  }

}

export default HrefElementConverter;

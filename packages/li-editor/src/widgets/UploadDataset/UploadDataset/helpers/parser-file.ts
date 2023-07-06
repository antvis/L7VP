import type { DatasetSchema } from '@antv/li-sdk';
import { getUniqueId } from '@antv/li-sdk';
import {
  parserExcelFileToSource,
  parserShapefileToSource,
  parserTextFileToSource,
} from '../../../../utils/dataset-parser/file-parser';
import { unzipFile } from './unzip-file';

export const parserFileToSource = async (file: File) => {
  const fileFullName = file.name;
  const fileNames = fileFullName.substring(0, fileFullName.lastIndexOf('.'));
  const fileExtension = fileFullName.substring(fileFullName.lastIndexOf('.') + 1);

  let dataset: DatasetSchema | undefined;

  if (fileExtension === 'zip') {
    try {
      const files = await unzipFile(file);
      dataset = await parserShapefileToSource(files, fileNames, getUniqueId(fileNames));
    } catch (message) {
      return Promise.reject(message);
    }
  } else {
    try {
      if (['xlsx', 'xls'].includes(fileExtension)) {
        dataset = await parserExcelFileToSource(file, fileNames, getUniqueId(fileNames));
      } else if (['csv', 'geojson', 'json'].includes(fileExtension)) {
        dataset = await parserTextFileToSource(file, fileNames, getUniqueId(fileNames));
      }
    } catch (e) {
      return Promise.reject('文件解析失败，请检查文件格式。');
    }
  }

  return dataset;
};

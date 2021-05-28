import exportFromJSON from 'export-from-json';
import { isEmpty } from 'underscore';


export const exportDataToJsonFile = ({ fileName, jsonData }) => {
    const newFileName = isEmpty(fileName) ? "new-flow-tree" : fileName;
    exportFromJSON({ data: jsonData, fileName: newFileName, exportType: "json" });
}
const path = require('path');
const fs = require('fs-extra');

const getDirectoryFiles = (dir, callback) => {
  const searchList = currDir => {
    fs.readdirSync(currDir).forEach(file => {
      const name = path.join(currDir, file);
      const relPath = name.replace(`${dir}/`, '');

      if (fs.statSync(name).isDirectory()) {
        if (callback(true, relPath, currDir, file) !== false) {
          // 해당 디렉토리 하위 탐색이 불필요할 시 콜백에서 false를 리턴
          searchList(name);
        }
      } else {
        callback(false, relPath);
      }
    }, []);
  };
  searchList(dir);
};

module.exports = getDirectoryFiles;

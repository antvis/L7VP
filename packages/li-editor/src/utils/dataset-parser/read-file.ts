export const readFileAsArrayBuffer = (file: File) => {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (event) => {
      const result = event.target?.result as ArrayBuffer;
      resolve(result);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export const readFileAsText = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (event) => {
      const result = event.target?.result as string;
      resolve(result);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

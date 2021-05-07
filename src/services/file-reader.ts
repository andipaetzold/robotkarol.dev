export async function readFile(file: File): Promise<string> {
  return await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsText(file);
  });
}

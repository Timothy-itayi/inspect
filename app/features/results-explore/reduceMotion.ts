/** Reads the Reduce Motion setting; if the read fails, draw normally (false) so circles never stay transparent. */
export async function readReduceMotion(read: () => Promise<boolean>): Promise<boolean> {
  try {
    return await read();
  } catch {
    return false;
  }
}

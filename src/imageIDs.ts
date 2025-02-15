export const generateImageIDs = (): string[] => {
    const ids: string[] = []
    for (let i = 1; i <= 9; i++) {
        ids.push(`wadouri:/dicom/${i.toString().padStart(3, '0')}.dcm`)
    }

    return ids
}
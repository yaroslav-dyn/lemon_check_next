
  export const calculatePositionByPosition = async (
    image,
    position,
    fontSize,
    textWidth,
    gaps=10
  ) => {
    const wmLengthFactor = textWidth;
    let sideFactor = {};
    const defaultGaps = parseInt(gaps) || 10;

    switch (position) {
      case "leftTop":
        sideFactor = {
          xPosition: defaultGaps,
          yPosition: defaultGaps + fontSize,
        };
        break;
      case "centerTop":
        sideFactor = {
          xPosition: image.width / 2 - wmLengthFactor / 2,
          yPosition: defaultGaps + fontSize,
        };
        break;
      case "rightTop":
        sideFactor = {
          xPosition: image.width - wmLengthFactor - defaultGaps,
          yPosition: defaultGaps + fontSize,
        };
        break;
      case "centerLeft":
        sideFactor = {
          xPosition: defaultGaps,
          yPosition: image.height / 2 - defaultGaps / 2,
        };
        break;
      case "centerCenter":
        sideFactor = {
          xPosition: image.width / 2 - wmLengthFactor / 2,
          yPosition: image.height / 2 - defaultGaps / 2,
        };
        break;
      case "centerRight":
        sideFactor = {
          xPosition: image.width - wmLengthFactor - defaultGaps,
          yPosition: image.height / 2 - defaultGaps / 2,
        };
        break;
      case "leftBottom":
        sideFactor = {
          xPosition: defaultGaps,
          yPosition: image.height - defaultGaps,
        };
        break;
      case "centerBottom":
        sideFactor = {
          xPosition: image.width / 2 - wmLengthFactor / 2,
          yPosition: image.height - defaultGaps,
        };
        break;
      case "rightBottom":
        sideFactor = {
          xPosition: image.width - wmLengthFactor - defaultGaps,
          yPosition: image.height - defaultGaps,
        };
        break;
    }
    return sideFactor;
  };

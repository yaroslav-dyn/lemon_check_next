
  export const calculatePositionByPosition = async (
    image,
    position,
    fontSize,
    textWidth
  ) => {
    const wmLengthFactor = textWidth;
    let sideFactor = {};
    const defaultGaps = 10;

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
      case "centerCenter":
        sideFactor = {
          xPosition: image.width / 2 - wmLengthFactor / 2,
          yPosition: image.height / 2 - (fontSize / 2),
        };
        break;
      case "leftBottom":
        sideFactor = {
          xPosition: defaultGaps,
          yPosition: image.height - (fontSize),
        };
        break;
      case "centerBottom":
        sideFactor = {
          xPosition: image.width / 2 - wmLengthFactor / 2 - defaultGaps,
          yPosition: image.height - (fontSize),
        };
        break;
      case "rightBottom":
        sideFactor = {
          xPosition: image.width - wmLengthFactor - defaultGaps,
          yPosition: image.height - (fontSize),
        };
        break;
    }
    return sideFactor;
  };

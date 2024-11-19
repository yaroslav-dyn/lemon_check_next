
  export const calculatePositionByPosition = async (
    image,
    position,
    fontSize,
    textWidth
  ) => {
    const wmLengthFactor = textWidth;
    let sideFactor = {};

    switch (position) {
      case "leftTop":
        sideFactor = { xPosition: 10, yPosition: fontSize };
        break;
      case "centerTop":
        sideFactor = {
          xPosition: (image.width / 2 - wmLengthFactor / 2) - 10,
          yPosition: fontSize,
        };
        break;
      case "rightTop":
        sideFactor = {
          xPosition: image.width - wmLengthFactor - 10,
          yPosition: fontSize,
        };
        break;
      case "leftBottom":
        sideFactor = { xPosition: 10, yPosition: image.height - fontSize };
        break;
      case "centerBottom":
        sideFactor = {
          xPosition: image.width / 2 - wmLengthFactor / 2,
          yPosition: image.height - fontSize,
        };
        break;
      case "rightBottom":
        sideFactor = {
          xPosition:
            image.width - wmLengthFactor - 10,
          yPosition: image.height - fontSize,
        };
        break;
    }
    return sideFactor;
  };

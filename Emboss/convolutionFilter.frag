#version 430 core

// Entry Variables
uniform float in_Bias;
uniform mat4  in_ConvolutionMat;
smooth in highp vec2    texCoord[9];
uniform sampler2D   in_Texture;

// Exit Variables
out vec4    color;


void    main()
{
    vec4    lColor = texture2D(in_Texture, texCoord[4]) * in_ConvolutionMat[1][1];
    lColor.rgb += texture2D(in_Texture, texCoord[0]).rgb * in_ConvolutionMat[0][0] +
                  texture2D(in_Texture, texCoord[1]).rgb * in_ConvolutionMat[0][1] +
                  texture2D(in_Texture, texCoord[2]).rgb * in_ConvolutionMat[0][2] +
                  texture2D(in_Texture, texCoord[3]).rgb * in_ConvolutionMat[1][0] +
                  texture2D(in_Texture, texCoord[5]).rgb * in_ConvolutionMat[1][2] +
                  texture2D(in_Texture, texCoord[6]).rgb * in_ConvolutionMat[2][0] +
                  texture2D(in_Texture, texCoord[7]).rgb * in_ConvolutionMat[2][1] +
                  texture2D(in_Texture, texCoord[8]).rgb * in_ConvolutionMat[2][2];
    float   lSum = in_ConvolutionMat[0][0] +
                   in_ConvolutionMat[0][1] +
                   in_ConvolutionMat[0][2] +
                   in_ConvolutionMat[1][0] +
                   in_ConvolutionMat[1][1] +
                   in_ConvolutionMat[1][2] +
                   in_ConvolutionMat[2][0] +
                   in_ConvolutionMat[2][1] +
                   in_ConvolutionMat[2][2];
    lSum = max(abs(lSum), 1.0f);
    color = vec4((lColor.rgb / lSum) + in_Bias, lColor.a);
}

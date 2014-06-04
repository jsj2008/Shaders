#version 430 core

// Entry Variables
uniform float in_PixelSize;
uniform vec2  in_ScreenSize;
uniform float in_PixelRadius;
uniform int   in_Luminance;
uniform float in_LuminanceBoost;
smooth in highp vec2    texCoord;
uniform sampler2D   in_Texture;

// Exit Variables
out vec4    color;

// Def Function
void    pixelate();
vec3    luminance(vec3);

void    main()
{
    pixelate();
}

void    pixelate()
{
    highp vec2  lTexStep = 1.0f / in_ScreenSize;
    highp vec2  lKernelNum = (texCoord / lTexStep) / in_PixelSize;
    highp vec2  lKernelNumTex = lTexStep * floor(lKernelNum) * in_PixelSize;
    lKernelNum = fract(lKernelNum);
    vec3        lColorAvg = vec3(0.0f);

    for (int i = 0; i < in_PixelSize; i++)
    {
        float   x = lKernelNumTex.s + i * lTexStep.s;
        for (int j = 0; j < in_PixelSize; j++)
        {
            float   y = lKernelNumTex.t + j * lTexStep.t;
            lColorAvg += texture2D(in_Texture, vec2(x, y)).rgb;
        }
    }
    lColorAvg /= (in_PixelSize * in_PixelSize);
    lColorAvg = luminance(lColorAvg);
    if (length(lKernelNum - vec2((1.0f / in_PixelSize)) * floor(in_PixelSize / 2.0f)) > in_PixelRadius)
        lColorAvg = vec3(0.0f);
    color = vec4(lColorAvg.rgb, texture2D(in_Texture, texCoord).a);
}

vec3    luminance(vec3 pColor)
{
    float   lSum = pColor.r + pColor.g + pColor.b;
    float   lLuminance = lSum / 3.0f;
    vec3    lRatio = pColor / lLuminance;
    float   lLuminanceStep = 1.0f / float(in_Luminance);
    float   lLuminanceBin = ceil(lLuminance / lLuminanceStep);
    float   lLuminanceFactor = lLuminanceStep * lLuminanceBin + in_LuminanceBoost;
    return lRatio * lLuminanceFactor;
}

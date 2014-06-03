#version 430 core

// Entry Variables
layout (location = 2) uniform float in_PixelSize;
layout (location = 3) uniform vec2  in_ScreenSize;
smooth in highp vec2    texCoord;
uniform sampler2D   in_Texture;

// Exit Variables
out vec4    color;

// Def Function
void    pixelate();

void    main()
{
    pixelate();
}

void    pixelate()
{
    highp vec2  lTexStep = 1.0f / in_ScreenSize;
    highp vec2  lKernelNumTex = lTexStep * floor((texCoord / lTexStep) / in_PixelSize) * in_PixelSize;
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
    color = vec4(lColorAvg.rgb, texture2D(in_Texture, texCoord).a);
}

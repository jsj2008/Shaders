#version 420
#extension GL_ARB_gpu_shader5 : enable

#ifdef GL_ES
precision highp float;
#endif

// Entry variable
uniform sampler2D   in_source1;
uniform float       in_h1;
uniform float       in_h2;
uniform float       in_smoothing;

smooth in highp vec2      texCoord;

// Exit variable
out vec4            out_Color;

// Functions definition
vec4		    treat();

void    main(void)
{
    out_Color = treat();
}

vec4	treat()
{
    vec4    lColor = texture2D(in_source1, texCoord);
    float   luminance = (0.2126 * lColor.r) + (0.7152 * lColor.g) + (0.0722 * lColor.b);
    float   lMinSmooth = in_h1 - in_smoothing;
    float   lMaxSmooth = in_h2 + in_smoothing;

    //      lColor = (clamp(sign(luminance - in_h1), 0.0f, 1.0f) * clamp(sign(in_h2 - luminance), 0.0f, 1.0f) - 1.0f) * -lColor; // color delete
    //      lColor.a += (clamp(sign(luminance - lMinSmooth), 0.0f, 1.0f) * clamp(sign(in_h1 - luminance), 0.0f, 1.0f) - 1.0f) * -smoothstep(in_h1, lMinSmooth, luminance); // color delete
    //      lColor.a += (clamp(sign(luminance - in_h2), 0.0f, 1.0f) * clamp(sign(lMaxSmooth - luminance), 0.0f, 1.0f) - 1.0f) * -smoothstep(in_h2, lMaxSmooth, luminance); // color delete
    if (luminance > in_h1 && luminance < in_h2)
        lColor = vec4(0.0f);
    else if (luminance > lMinSmooth && luminance < in_h1)
        lColor[3] = smoothstep(in_h1, lMinSmooth, luminance); // fix alpha
    else if (luminance > in_h2 && luminance < lMaxSmooth)
        lColor[3] = smoothstep(in_h2, lMaxSmooth, luminance); // fix alpha
    return lColor * vec4(lColor.aaa, 1.0f);
}

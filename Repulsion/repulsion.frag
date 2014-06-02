#version 420
#extension GL_ARB_gpu_shader5 : enable

#ifdef GL_ES
precision highp float;
#endif

// Input
smooth in highp vec2    texCoord;
uniform sampler2D       in_source1;
uniform bool            in_texture1Bind;

out vec4    out_Color;

void main(void)
{
    if (in_texture1Bind)
        out_Color = texture2D(in_source1, texCoord);
    else
        out_Color = vec4(0.0f, 0.0f, 0.0f, 1.0f);
}

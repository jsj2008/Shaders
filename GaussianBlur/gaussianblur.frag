#version 420
#extension GL_ARB_gpu_shader5 : enable
#define KERNEL 10

#ifdef GL_ES
precision highp float;
#endif

smooth in highp vec2	texCoord;
smooth in highp vec2	offsetP[KERNEL];
smooth in highp vec2	offsetN[KERNEL];

// Entry
uniform sampler2D		in_source1;
uniform bool			in_texture1Bind;
uniform float			in_weight[KERNEL];

// Exit
out vec4	out_Color;

// Function def
vec4		HBlur();
vec4		VBlur();

void	main()
{
    if (!in_texture1Bind)
        out_Color = vec4(0.0f);
    else
    {
        out_Color = texture2D(in_source1, texCoord) * in_weight[0];
        out_Color += texture2D(in_source1, offsetP[1]) * in_weight[1];
        out_Color += texture2D(in_source1, offsetN[1]) * in_weight[1];
        out_Color += texture2D(in_source1, offsetP[2]) * in_weight[2];
        out_Color += texture2D(in_source1, offsetN[2]) * in_weight[2];
        out_Color += texture2D(in_source1, offsetP[3]) * in_weight[3];
        out_Color += texture2D(in_source1, offsetN[3]) * in_weight[3];
        out_Color += texture2D(in_source1, offsetP[4]) * in_weight[4];
        out_Color += texture2D(in_source1, offsetN[4]) * in_weight[4];
        out_Color += texture2D(in_source1, offsetP[5]) * in_weight[5];
        out_Color += texture2D(in_source1, offsetN[5]) * in_weight[5];
        out_Color += texture2D(in_source1, offsetP[6]) * in_weight[6];
        out_Color += texture2D(in_source1, offsetN[6]) * in_weight[6];
        out_Color += texture2D(in_source1, offsetP[7]) * in_weight[7];
        out_Color += texture2D(in_source1, offsetN[7]) * in_weight[7];
        out_Color += texture2D(in_source1, offsetP[8]) * in_weight[8];
        out_Color += texture2D(in_source1, offsetN[8]) * in_weight[8];
        out_Color += texture2D(in_source1, offsetP[9]) * in_weight[9];
        out_Color += texture2D(in_source1, offsetN[9]) * in_weight[9];
//        out_Color += texture2D(in_source1, offsetP[10]) * in_weight[10];
//        out_Color += texture2D(in_source1, offsetN[10]) * in_weight[10];
//        out_Color += texture2D(in_source1, offsetP[11]) * in_weight[11];
//        out_Color += texture2D(in_source1, offsetN[11]) * in_weight[11];
//        out_Color += texture2D(in_source1, offsetP[12]) * in_weight[12];
//        out_Color += texture2D(in_source1, offsetN[12]) * in_weight[12];
//        out_Color += texture2D(in_source1, offsetP[13]) * in_weight[13];
//        out_Color += texture2D(in_source1, offsetN[13]) * in_weight[13];
//        out_Color += texture2D(in_source1, offsetP[14]) * in_weight[14];
//        out_Color += texture2D(in_source1, offsetN[14]) * in_weight[14];
        out_Color.a = texture2D(in_source1, texCoord).a;
    }
}

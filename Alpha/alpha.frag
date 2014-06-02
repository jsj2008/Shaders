#version 420
#extension GL_ARB_gpu_shader5 : enable

#ifdef GL_ES
precision highp float;
#endif

smooth in highp vec2 texCoord;

uniform sampler2D in_source1;
uniform sampler2D in_source2;
uniform float in_alpha;

out vec4 out_Color;

void main(void)
{
    vec4	lTex0 = texture2D(in_source1, texCoord);
    vec4	lTex1 = texture2D(in_source2, texCoord);
    out_Color = mix(lTex0, lTex1, in_alpha);
}

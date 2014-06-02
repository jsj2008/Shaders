#version 420
#extension GL_ARB_gpu_shader5 : enable

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D	in_source1;
smooth in highp vec2	texCoord;
uniform float		in_radius;
uniform float		in_diffraction;
uniform vec2		in_mousePos;
uniform vec2		in_screenSize;
uniform bool		in_texture1Bind;

out vec4		out_Color;

void main()
{
    if (in_texture1Bind)
    {
            vec2	tc = texCoord;
            vec2	xy = vec2(gl_FragCoord.x, gl_FragCoord.y) - in_mousePos.xy;
            float	r = sqrt(xy.x * xy.x + xy.y * xy.y);
            if (r < in_radius)
            {
                float	h = in_diffraction * 0.5 * in_radius;
                vec2	new_xy = r < in_radius ? xy * (in_radius - h) / sqrt(in_radius * in_radius - r * r) : xy;
                tc = (new_xy + in_mousePos) / in_screenSize;
            }
            out_Color = texture2D(in_source1, tc);
    }
    else
        discard;
}


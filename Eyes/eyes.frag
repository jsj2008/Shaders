#version 420
#extension GL_ARB_gpu_shader5 : enable

#ifdef GL_ES
precision highp float;
#endif

// Entry variable
uniform sampler2D	in_source1;
uniform float		in_axisX;
uniform float		in_axisY;
uniform float		in_smooth;
uniform vec2		in_center;
uniform bool		in_texture1Bind;

smooth in highp vec2	texCoord;

// Exit variable
out vec4		out_Color;

// Function definition
float	IsInsideEllipse(float, float, float, float, float, float);
vec4	treat();

void    main(void)
{
    if (in_texture1Bind)
        out_Color = treat();
    else
        out_Color = vec4(0.0f);
}

vec4	treat()
{
    vec4    lColor = texture2D(in_source1, texCoord);
    float   lResEllipse = 0.0f;

    if (in_axisX == 0.0f || in_axisY == 0.0f || lColor.a <= 0.01f)
        return vec4(0.0f);
    lResEllipse = IsInsideEllipse(gl_FragCoord.x, gl_FragCoord.y, in_center.x, in_center.y, in_axisX, in_axisY);
    if (lResEllipse <= 1.0f) // if pixel inside ellipse
        return lColor;
    else if (lResEllipse <= in_smooth) // if pixel between 1.0f ~ in_smooth (second ellipse)
    {
        lColor[3] = smoothstep(in_smooth, 1.0f, lResEllipse);
        return vec4(lColor.rgb * lColor[3], lColor[3]);
    }
    else
        return vec4(0.0f);
}

float	IsInsideEllipse(float pX, float pY, float pU, float pV, float pXe, float pYe)
/*
  pX: pixel position (axe X)
  pY: pixel position (axe Y)
  pU: ellipse center (axe X)
  pV: ellipse center (axe Y)
  pXe: ellipse width (axe X)
  pYe: ellipse height (axe Y)

  Ellipse equation:

  (pX - pU)^2      (pY - pV)^2
  -----------   +   -----------   = res
     pXe^2            pYe^2

  if res == 1, point on the edge
  if res < 1, point inside
  if res > 1, point outside
*/
{
    float   lF1 = pow(pX - pU, 2) / pow(pXe, 2);
    float   lF2 = pow(pY - pV, 2) / pow(pYe, 2);
    return lF1 + lF2;
}
